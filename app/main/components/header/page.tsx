import Image from "next/image";
import styles from "./header.module.sass";

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;
