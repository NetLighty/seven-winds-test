import styles from "./table.module.sass";

const ProjectTable: React.FC = () => {
  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <span>Уровень</span>
        <span>Наименование работ</span>
        <span>Основная з/п</span>
        <span>Оборудование</span>
        <span>Накладные расходы</span>
        <span>Сметная прибыль</span>
      </div>
    </div>
  );
};

export default ProjectTable;
