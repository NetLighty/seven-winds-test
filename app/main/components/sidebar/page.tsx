import Image from "next/image";
import styles from "./sidebar.module.sass";
import { sidebarItems } from "./data";
import SidebarItem from "./sidebarItem";
import { v4 as uuidv4 } from "uuid";

const SideBar: React.FC = () => {
  return (
    <aside className={styles["side-bar"]}>
      <div className={styles["side-bar__filter"]}>
        <div className={styles.container}>
          <span className={styles.filter__title}>Название проекта</span>
          <span className={styles.filter__subtitle}>Аббревиатура</span>
        </div>
        <Image src="/arrow.svg" width={24} height={24} alt="arrow-icon" />
      </div>
      {sidebarItems.map((title) => {
        return <SidebarItem key={uuidv4()} title={title} />;
      })}
    </aside>
  );
};

export default SideBar;
