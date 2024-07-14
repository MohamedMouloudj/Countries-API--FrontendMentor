import { IonIcon } from "@ionic/react";
import { moonOutline } from "ionicons/icons";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <h2
        className={styles.title}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        Where in the world?
      </h2>
      <div className={styles.toggle}>
        <label htmlFor="toggle-theme" className={styles.toggleLabel}>
          <IonIcon slot="start" icon={moonOutline}></IonIcon> Dark Mode
        </label>
        <input type="checkbox" id="toggle-theme" className="toggle-checkbox" />
      </div>
    </div>
  );
}

export default Header;
