import styles from "./page.module.sass";
import SideBar from "./components/sidebar/page";
import Header from "./components/header/page";
import Project from "./components/project/page";

const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={styles["main-container"]}>
        <SideBar />
        <Project />
      </div>
    </div>
  );
};

export default Main;
