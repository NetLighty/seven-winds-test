'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './table.module.sass';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Distance, TableRow } from './table.types';
import { emptyTableRow, extractNumbersFromString } from './table.service';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useTableStore } from '../store/store';
import LinkLine from './linkLine';

type TableRowProps = {
  tableRowData: TableRow;
  nestingLevel: number;
  parentId: number | null;
  parentIconRef: React.MutableRefObject<HTMLImageElement | null> | null;
};

const TableRow: React.FC<TableRowProps> = ({
  tableRowData,
  nestingLevel,
  parentId,
  parentIconRef,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(tableRowData.isEdit || false);
  const [tableRow, setTableRow] = useState<TableRow>(tableRowData);
  const [iconsDistance, setIconsDistance] = useState<Distance>();

  const removeRow = useTableStore((state) => state.deleteRow);
  const createRow = useTableStore((state) => state.createRow);
  const updateRow = useTableStore((state) => state.updateRow);

  const iconRef = useRef<HTMLImageElement | null>(null);

  const setIsEditTrue = () => {
    setIsEdit(true);
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsEdit(false);
      if (tableRow.id === null) createTableRow();
      if (tableRow.id !== null) updateTableRow();
    }
  };

  const createTableRow = () => {
    createRow({
      ...tableRow,
      parentId,
    });
  };

  const updateTableRow = () => {
    updateRow(
      {
        ...tableRow,
        id: tableRow.id!,
      },
      tableRow
    );
  };

  const deleteTableRow = () => {
    removeRow({ id: tableRow.id! });
  };

  const addTableRow = (e: React.MouseEvent) => {
    if (tableRow.child.filter((el) => el.isEdit === true).length > 0) return;
    setTableRow((tableRow) => ({
      ...tableRow,
      child: [...tableRow.child, emptyTableRow],
    }));
  };

  const onRowNameChange = (e: ContentEditableEvent) => {
    setTableRow((tableRow) => ({
      ...tableRow,
      rowName: e.target.value,
    }));
  };

  const onSalaryChange = (e: ContentEditableEvent) => {
    const salary = Number(extractNumbersFromString(e.target.value));

    setTableRow((tableRow) => ({ ...tableRow, salary }));
  };

  const onOverheadsChange = (e: ContentEditableEvent) => {
    const overheads = Number(extractNumbersFromString(e.target.value));

    setTableRow((tableRow) => ({ ...tableRow, overheads }));
  };

  const onEstimatedProfitChange = (e: ContentEditableEvent) => {
    const estimatedProfit = Number(extractNumbersFromString(e.target.value));

    setTableRow((tableRow) => ({ ...tableRow, estimatedProfit }));
  };

  const onEquipmentCostsChange = (e: ContentEditableEvent) => {
    const equipmentCosts = Number(extractNumbersFromString(e.target.value));

    setTableRow((tableRow) => ({ ...tableRow, equipmentCosts }));
  };

  const calculateDistance = (
    childRef: React.MutableRefObject<HTMLImageElement | null> | null,
    parentRef: React.MutableRefObject<HTMLImageElement | null> | null
  ) => {
    if (!childRef?.current || !parentRef?.current) {
      return { deltaX: 0, deltaY: 0 };
    }

    const rect1 = childRef.current.getBoundingClientRect();
    const rect2 = parentRef.current.getBoundingClientRect();

    const deltaX = rect2.left - rect1.left;
    const deltaY = rect2.top - rect1.top;

    return { deltaX, deltaY };
  };

  useEffect(() => {
    if (parentIconRef?.current && iconRef.current) {
      const distance: Distance = calculateDistance(parentIconRef, iconRef);
      setIconsDistance(distance);
    }
  }, []);

  return (
    <>
      <tr
        className={styles.row}
        onDoubleClick={setIsEditTrue}
        onKeyDown={handleEnterPress}
      >
        <td
          style={{ paddingLeft: `${12 + nestingLevel * 21}px` }}
          className={styles.cell}
        >
          <div className={styles.buttonsContainer}>
            <Image
              ref={iconRef}
              style={isEdit ? { opacity: '1' } : undefined}
              className={styles.createIcon_absolute}
              src="/doc.svg"
              width={24}
              height={24}
              alt="add-icon"
            />
            {iconsDistance && <LinkLine iconsDistance={iconsDistance} />}
            <div
              style={
                isEdit ? { pointerEvents: 'none', opacity: '0' } : undefined
              }
              className={styles.buttons}
            >
              <Image
                onDoubleClick={(e) => e.stopPropagation()}
                onClick={addTableRow}
                className={styles.createIcon}
                src="/doc.svg"
                width={24}
                height={24}
                alt="add-icon"
              />
              <Image
                onClick={deleteTableRow}
                className={styles.deleteIcon}
                src="/trash.svg"
                width={18}
                height={18}
                alt="add-icon"
              />
            </div>
          </div>
        </td>
        <td className={styles.cell}>
          <ContentEditable
            disabled={!isEdit}
            html={tableRow.rowName}
            className={isEdit ? styles.cell_editable : undefined}
            onChange={onRowNameChange}
          />
        </td>
        <td className={styles.cell}>
          <ContentEditable
            disabled={!isEdit}
            html={tableRow.salary.toString()}
            className={isEdit ? styles.cell_editable : undefined}
            onChange={onSalaryChange}
          />
        </td>
        <td className={styles.cell}>
          <ContentEditable
            disabled={!isEdit}
            html={tableRow.equipmentCosts.toString()}
            className={isEdit ? styles.cell_editable : undefined}
            onChange={onEquipmentCostsChange}
          />
        </td>
        <td className={styles.cell}>
          <ContentEditable
            disabled={!isEdit}
            html={tableRow.overheads.toString()}
            className={isEdit ? styles.cell_editable : undefined}
            onChange={onOverheadsChange}
          />
        </td>
        <td className={styles.cell}>
          <ContentEditable
            disabled={!isEdit}
            html={tableRow.estimatedProfit.toString()}
            className={isEdit ? styles.cell_editable : undefined}
            onChange={onEstimatedProfitChange}
          />
        </td>
      </tr>
      {tableRow.child.length > 0 && (
        <>
          {tableRow.child.map((childData) => {
            return (
              <TableRow
                key={uuidv4()}
                tableRowData={childData}
                nestingLevel={nestingLevel + 1}
                parentId={tableRow.id}
                parentIconRef={iconRef}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default TableRow;
