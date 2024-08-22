import React from "react";
import styles from "./Details.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  let navigate = useNavigate();
  let { name } = useParams();
  let [countryDetail, setCountryDetail] = useState([]);
  let [currency, setCurrency] = useState("");
  let [languages, setLanguages] = useState("");
  let [borders, setBorders] = useState([]);
  let [code, setCode] = useState(true);

  const getCurrencies = (currencyObj) => {
    let idx = 0;
    let currency = "";
    for (let flag in currencyObj) {
      if (idx) {
        currency += ", ";
      }
      currency += currencyObj[flag].name;
      idx++;
    }
    setCurrency(currency);
  };

  const getLanguages = (languagesObj) => {
    let idx = 0;
    let languages = "";
    for (let flag in languagesObj) {
      if (idx) {
        languages += ", ";
      }
      languages += languagesObj[flag];
      idx++;
    }
    setLanguages(languages);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        let jsonData = await fetch(
          `https://restcountries.com/v3.1/alpha/${name}`
        );
        let countryData = await jsonData.json();

        setCountryDetail([...countryData]);
        getLanguages(countryData[0].languages);
        getCurrencies(countryData[0].currencies);
        if (countryData[0].borders) {
          setBorders(countryData[0].borders);
        }
      };

      fetchData();
    } catch (e) {
      setCountryDetail([]);
    }
  }, [code]);

  return (
    <div>
      <button
        className={styles.btnCon}
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
      {countryDetail.length ? (
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img src={countryDetail[0].flags.png} alt="flag" />
          </div>

          <div className={styles.bodyContainer}>
            <div className={styles.heading}>{countryDetail[0].name.common}</div>
            <div className={styles.detail}>
              <div className={styles.left}>
                <div>
                  <span>Native Name: </span>
                </div>
                <div>
                  <span>Population: </span>
                  {countryDetail[0].population}
                </div>
                <div>
                  <span>Region: </span>
                  {countryDetail[0].region}
                </div>
                <div>
                  <span>Sub Region: </span>
                  {countryDetail[0].subregion}
                </div>
                <div>
                  <span>Capital: </span>
                  {countryDetail[0].capital}
                </div>
              </div>
              <div className={styles.right}>
                <div>
                  <span>Top Level Domain : </span>
                  {countryDetail[0].tld}
                </div>

                <div>
                  <span>Currencies: </span>
                  {currency}
                </div>
                <div>
                  <span>Languages: </span>
                  {languages}
                </div>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <span>Border Countries:</span>
              {borders.map((border) => {
                return (
                  <button
                    key={border}
                    className={styles.btn}
                    onClick={() => {
                      setCode(!code);
                      navigate(`/country/${border}`, { replace: true });
                    }}
                  >
                    {border}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
}

export default Detail;
