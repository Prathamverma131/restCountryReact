import React from 'react'
import styles from './Filter.module.css';

function Filter({region,setRegion}) {
  return (
    <div className={styles.container}>
        <div className="filter1-container">
            <select className={styles.select} onChange={(e)=>{
                setRegion(e.target.value);
            }}>
                <option value="" defaultValue="">Filter by region</option>
                <option value="africa">Africa</option>
                <option value="americas">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="ocenia">Ocenia</option>
            </select>
        </div>
    </div>
  )
}

export default Filter;