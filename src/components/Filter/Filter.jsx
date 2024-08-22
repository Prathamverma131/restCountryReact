import React from "react";
import styles from "./Filter.module.css";

function Filter({ region, setRegion, subRegionObj, setSubRegion, setOrder }) {
  let subRegions = [];

  if (region) {
    let subRegionSet = subRegionObj[region];
    subRegions = Array.from(subRegionSet);
  }

  return (
    <div className={styles.container}>
      <div className="filter1-container">
        <select
          className={styles.select}
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        >
          <option value="" defaultValue="">
            Filter by region
          </option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Ocenia</option>
        </select>
      </div>
      <div className="filter2-container">
        <select
          className={styles.select}
          onChange={(e) => {
            setSubRegion(e.target.value);
          }}
        >
          <option value="" defaultValue="">
            Filter by sub-region
          </option>
          {subRegions.length
            ? subRegions.map((subregion) => {
                return (
                  <option value={subregion} key={subregion}>
                    {subregion}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      <div className="filter3-container">
        <select
          className={styles.select}
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option value="" defaultValue="">
            Filter by order
          </option>
          <option value="ascbypop">Sort by ascending population</option>
          <option value="descbypop">Sort by descending population</option>
          <option value="ascbyarea">Sort by ascending area</option>
          <option value="descbyarea">Sort by descending area</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
