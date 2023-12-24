import ProjectTable from "./table/page";
import styles from "./project.module.sass";

const Project: React.FC = () => {
  return (
    <section>
      <div className={styles.project}>
        <div className={styles["project-header"]}>
          <div className={styles["project-header__title"]}>
            <span>Строительно-монтажные работы</span>
          </div>
        </div>
      </div>
      <ProjectTable />
    </section>
  );
};

export default Project;
