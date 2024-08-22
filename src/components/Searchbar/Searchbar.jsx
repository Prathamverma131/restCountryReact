import React from "react";
import styles from "./Searchbar.module.css";
import { useContext } from "react";
import { Context } from "../Home";

function Searchbar({ searchCountry, setSearchCountry }) {
  const [darkMode, setDarkMode] = useContext(Context);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => {
          setSearchCountry(e.target.value);
        }}
      />
    </div>
  );
}

export default Searchbar;
