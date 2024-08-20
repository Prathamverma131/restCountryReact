import React from 'react'
import styles from './Cards.module.css';

function Cards({cardsData}) {
    if(!cardsData.length){
        return <div>No data found...</div>
    }

  return (
    <div className={styles.container}>
        {

           cardsData.map((card)=>{

            return  <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
            <img src={card.flags.png} alt="" /> 
            </div>
            <div className={styles.body}>
                <div className={styles.name}>{card.name.common}</div>
                <div>Population:- {card.population}</div>
                <div>Region:- {card.region}</div>
                <div>Capital:- {card.capital}</div>
            </div>
        </div>
           })

        }
        
        </div>
  )
}

export default Cards