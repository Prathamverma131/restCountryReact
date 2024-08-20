import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Searchbar from "./Searchbar/Searchbar";
import Filter from "./Filter/Filter.jsx";
import Cards from "./Cards/Cards.jsx";

export const Context = React.createContext();

function App() {
  let [countriesData, setCountriesData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  let [searchCountry, setSearchCountry] = useState("");
  let [region, setRegion] = useState("");
  let [darkMode, setDarkMode] = useState(false);
  let [loader, setLoder] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let apiData = await fetch("https://restcountries.com/v3.1/all");
        let jsonData = await apiData.json();
        setCountriesData([...jsonData]);
        setFilteredData([...jsonData]);
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

    setFilteredData([...filterCountry]);
  }, [searchCountry, region]);

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
            <Filter region={region} setRegion={setRegion} />
            <Cards cardsData={filteredData} />
          </>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
