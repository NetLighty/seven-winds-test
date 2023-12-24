import Image from "next/image";
import styles from "./page.module.sass";
import { sidebarItems } from "./data";
import SidebarItem from "./components/sidebarItem/sidebarItem";
import { v4 as uuidv4 } from "uuid";

const Main: React.FC = () => {
  return (
    <div>
      <header className={styles.header}>
        <Image
          className={styles["menu-icon"]}
          src="/menu.svg"
          width={24}
          height={24}
          alt="menu-icon"
        />
        <Image
          className={styles["share-icon"]}
          src="/share.svg"
          width={24}
          height={24}
          alt="share-icon"
        />
        <div className={styles.item_active}>
          <span className={styles.text_medium}>Просмотр</span>
        </div>
        <div className={styles.item}>
          <span className={styles.text_medium}>Управление</span>
        </div>
      </header>
      <div className={styles["main-container"]}>
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
        <div className={styles["entity-header"]}>
          <div className={styles["entity-header__title"]}>
            <span>Строительно-монтажные работы</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
