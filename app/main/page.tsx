import Image from "next/image";
import styles from "./page.module.sass";

const Main: React.FC = () => {
  return (
    <div>
      <header className={styles.header}>
        <Image
          className={styles["menu-icon"]}
          src="/dott.svg"
          width={24}
          height={24}
          alt="arrow-icon"
        ></Image>
        <Image
          className={styles["share-icon"]}
          src="/arrow.svg"
          width={24}
          height={24}
          alt="menu-icon"
        ></Image>
        <div className={styles.item_active}>
          <span className={styles.text_normal}>Просмотр</span>
        </div>
        <div className={styles.item}>
          <span className={styles.text_normal}>Управление</span>
        </div>
      </header>
      <aside className={styles["side-bar"]}>
        <div className={styles["side-bar__filter"]}></div>
      </aside>
    </div>
  );
};

export default Main;
