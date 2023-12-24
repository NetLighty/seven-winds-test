import Image from "next/image";
import styles from "./sidebarItem.module.sass";

type sidebarItemProps = {
  title: string;
};

const SidebarItem: React.FC<sidebarItemProps> = ({title}) => {
  return (
    <div className={styles["sidebar-item"]}>
      <Image src="/blocks.svg" width={22} height={22} alt="blocks-icon" />
      <span className={styles["sidebar-item__title"]}>{title}</span>
    </div>
  );
};

export default SidebarItem;
