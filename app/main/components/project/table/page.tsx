'use client';
import { useEffect } from 'react';
import styles from './table.module.sass';
import TableRow from './tableRow';
import { useTableStore } from '../store/store';
import { v4 as uuidv4 } from 'uuid';
import { emptyTableRow } from './table.service';

const ProjectTable: React.FC = () => {
  const treeRows = useTableStore((state) => state.treeRows);
  const setRows = useTableStore((state) => state.setRows);
  const isLoading = useTableStore((state) => state.isLoading);

  useEffect(() => {
    setRows();
  }, []);

  return (
    <div className={styles.table}>
      <table className={styles.borderCollapse}>
        <thead>
          <tr className={styles.head}>
            <th className={styles.level}>
              <span>Уровень</span>
            </th>
            <th className={styles.rowName}>
              <span>Наименование работ</span>
            </th>
            <th className={styles.salary}>
              <span>Основная з/п</span>
            </th>
            <th className={styles.equipmentCosts}>
              <span>Оборудование</span>
            </th>
            <th className={styles.overheads}>
              <span>Накладные расходы</span>
            </th>
            <th className={styles.estimatedProfit}>
              <span>Сметная прибыль</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {treeRows.length === 0 && !isLoading ? (
            <TableRow
              tableRowData={emptyTableRow}
              nestingLevel={0}
              parentId={null}
            />
          ) : (
            treeRows.map((tableRow) => {
              return (
                <TableRow
                  key={uuidv4()}
                  tableRowData={tableRow}
                  nestingLevel={0}
                  parentId={null}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
