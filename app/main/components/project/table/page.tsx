import styles from './table.module.sass';
import TableRow from './tableRow';

const ProjectTable: React.FC = () => {
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
          <TableRow
            equipmentCosts={0}
            estimatedProfit={0}
            machineOperatorSalary={0}
            mainCosts={0}
            materials={0}
            mimExploitation={0}
            overheads={0}
            rowName={'Южная строительная площадка'}
            salary={0}
            supportCosts={0}
          />
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
