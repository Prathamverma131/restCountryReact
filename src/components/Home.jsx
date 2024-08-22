import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Searchbar from "./Searchbar/Searchbar";
import Filter from "./Filter/Filter.jsx";
import Cards from "./Cards/Cards.jsx";

export const Context = React.createContext();

function Home() {
  let [countriesData, setCountriesData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  let [searchCountry, setSearchCountry] = useState("");
  let [region, setRegion] = useState("");
  let [darkMode, setDarkMode] = useState(false);
  let [loader, setLoder] = useState(true);
  let [subRegionObj, setSubRegionObj] = useState({});
  let [subRegion, setSubRegion] = useState("");
  let [order, setOrder] = useState("");

  const mapRegionWithSubregion = (countries) => {
    let subRegionFRomRegion = {};

    countries.forEach((country) => {
      if (subRegionFRomRegion[country.region]) {
        if (country.subregion) {
          subRegionFRomRegion[country.region].add(country.subregion);
        }
      } else {
        subRegionFRomRegion[country.region] = new Set();
        if (country.subregion) {
          subRegionFRomRegion[country.region].add(country.subregion);
        }
      }
      setSubRegionObj(subRegionFRomRegion);
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let apiData = await fetch("https://restcountries.com/v3.1/all");
        let jsonData = await apiData.json();
        setCountriesData([...jsonData]);
        setFilteredData([...jsonData]);
        mapRegionWithSubregion(jsonData);
      } catch (e) {
        console.log("APi call failed");
        setCountriesData([]);
        setFilteredData([]);
      } finally {
        setLoder(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setSubRegion("");
    setOrder("");
  }, [region]);

  useEffect(() => {
    setOrder("");
  }, [subRegion]);

  useEffect(() => {
    let filterCountry = [...countriesData];
    if (region) {
      filterCountry = filterCountry.filter(
        (country) => country.region.toLowerCase() === region.toLowerCase()
      );
    }
    if (searchCountry) {
      filterCountry = filterCountry.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
      );
    }
    if (subRegion) {
      filterCountry = filterCountry.filter(
        (country) => country.subregion.toLowerCase() === subRegion.toLowerCase()
      );
    }
    if (order) {
      if (order == "ascbypop") {
        filterCountry.sort((a, b) => {
          if (a.population > b.population) {
            return 1;
          } else if (a.population < b.population) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (order == "descbypop") {
        filterCountry.sort((a, b) => {
          if (a.population > b.population) {
            return -1;
          } else if (a.population < b.population) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (order == "ascbyarea") {
        filterCountry.sort((a, b) => {
          if (a.area > b.area) {
            return 1;
          } else if (a.area < b.area) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (order == "descbyarea") {
        filterCountry.sort((a, b) => {
          if (a.area > b.area) {
            return -1;
          } else if (a.area < b.area) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }

    setFilteredData([...filterCountry]);
  }, [searchCountry, region, subRegion, order]);

  return (
    <Context.Provider value={[darkMode, setDarkMode]}>
      <div className={darkMode ? "darkWrapper" : null}>
        <Navbar />
        <Searchbar
          searchCountry={searchCountry}
          setSearchCountry={setSearchCountry}
        />
        {loader ? (
          <div className="loader">Loading data...</div>
        ) : (
          <>
            <Filter
              region={region}
              setRegion={setRegion}
              subRegionObj={subRegionObj}
              setSubRegion={setSubRegion}
              setOrder={setOrder}
            />
            <Cards cardsData={filteredData} />
          </>
        )}
      </div>
    </Context.Provider>
  );
}

export default Home;
