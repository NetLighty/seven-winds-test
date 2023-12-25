'use client';
import { useState } from 'react';
import styles from './table.module.sass';
import Image from 'next/image';

type TableRowProps = {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: 0;
  mainCosts: 0;
  materials: 0;
  mimExploitation: 0;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: 0;
};

const TableRow: React.FC<TableRowProps> = ({
  equipmentCosts,
  estimatedProfit,
  overheads,
  rowName,
  salary,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const setIsEditTrue = () => {
    setIsEdit(true);
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsEdit(false);
    }
  };

  return (
    <tr
      className={styles.row}
      onDoubleClick={setIsEditTrue}
      onKeyDown={handleEnterPress}
    >
      <td className={styles.cell}>
        <Image
          className={styles.createIcon}
          src="/doc.svg"
          width={24}
          height={24}
          alt="add-icon"
        />
        <div
          style={{ display: `${isEdit ? 'none' : 'flex'}` }}
          className={styles.buttons}
        >
          <Image
            className={styles.createIcon}
            src="/doc.svg"
            width={24}
            height={24}
            alt="add-icon"
          />
          <Image
            className={styles.deleteIcon}
            src="/trash.svg"
            width={17}
            height={17}
            alt="add-icon"
          />
        </div>
      </td>
      <td className={styles.cell}>
        <div
          contentEditable={isEdit}
          className={isEdit ? styles.cell_editable : undefined}
        >
          {rowName}
        </div>
      </td>
      <td className={styles.cell}>
        <div
          contentEditable={isEdit}
          className={isEdit ? styles.cell_editable : undefined}
        >
          {salary}
        </div>
      </td>
      <td className={styles.cell}>
        <div
          contentEditable={isEdit}
          className={isEdit ? styles.cell_editable : undefined}
        >
          {equipmentCosts}
        </div>
      </td>
      <td className={styles.cell}>
        <div
          contentEditable={isEdit}
          className={isEdit ? styles.cell_editable : undefined}
        >
          {overheads}
        </div>
      </td>
      <td className={styles.cell}>
        <div
          contentEditable={isEdit}
          className={isEdit ? styles.cell_editable : undefined}
        >
          {estimatedProfit}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
