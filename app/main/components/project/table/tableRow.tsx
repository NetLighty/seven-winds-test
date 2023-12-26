'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './table.module.sass';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { TableRow } from './table.types';
import { emptyTableRow, extractNumbersFromString } from './table.service';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useTableStore } from '../store/store';

type TableRowProps = {
  tableRowData: TableRow;
  nestingLevel: number;
  parentId: number | null;
};

const TableRow: React.FC<TableRowProps> = ({
  tableRowData,
  nestingLevel,
  parentId,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(tableRowData.isEdit || false);
  const [tableRow, setTableRow] = useState<TableRow>(tableRowData);

  const removeRow = useTableStore((state) => state.deleteRow);
  const createRow = useTableStore((state) => state.createRow);
  const updateRow = useTableStore((state) => state.updateRow);
  const addEmptyRow = useTableStore((state) => state.addEmptyRow);

  const elementRef1 = useRef<HTMLImageElement>(null);
  const elementRef2 = useRef<HTMLImageElement>(null);

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
    //addEmptyRow(tableRow.id!);
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

  useEffect(() => {
    if (elementRef1.current && elementRef2.current) {
      const rect1 = elementRef1.current.getBoundingClientRect();
      const rect2 = elementRef2.current.getBoundingClientRect();

      const xOffset = rect2.left - rect1.left;
      const yOffset = rect2.top - rect1.top;
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
              style={isEdit ? { opacity: '1' } : undefined}
              className={styles.createIcon_absolute}
              src="/doc.svg"
              width={24}
              height={24}
              alt="add-icon"
            />
            {tableRowData.child.map((childData, index) => {
              return (
                <div
                  key={uuidv4()}
                  style={{
                    top: `${21}px`,
                  }}
                  className={styles.linkContainer}
                >
                  <div
                    style={
                      index > 0
                        ? {
                            height: `${60}px`,
                            bottom: `${7}px`,
                          }
                        : undefined
                    }
                    className={styles.line1}
                  ></div>
                  <div className={styles.line2}></div>
                </div>
              );
            })}
            <div
              style={
                isEdit ? { pointerEvents: 'none', opacity: '0' } : undefined
              }
              className={styles.buttons}
            >
              <Image
                onDoubleClick={(e) => e.stopPropagation()}
                onClick={addTableRow}
                ref={elementRef1}
                className={styles.createIcon}
                src="/doc.svg"
                width={24}
                height={24}
                alt="add-icon"
              />
              <Image
                onClick={deleteTableRow}
                ref={elementRef2}
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
      {tableRow.child.length > 0 && nestingLevel < 5 && (
        <>
          {tableRow.child.map((childData) => {
            return (
              <TableRow
                key={uuidv4()}
                tableRowData={childData}
                nestingLevel={nestingLevel + 1}
                parentId={tableRow.id}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default TableRow;
