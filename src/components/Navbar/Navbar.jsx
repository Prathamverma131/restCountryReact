import React from "react";
import styles from "./navbar.module.css";
import { useContext } from "react";
import { Context } from "../Home";

function Navbar() {
  const [darkMode, setDarkMode] = useContext(Context);

  return (
    <div className={styles.container}>
      <div className={styles.left}>Where in the world</div>
      <div className={styles.right}>
        <div className="logo-container"></div>
        <div
          className="content"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
