import "./App.css";
import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";

function App() {
  const [countryName, setcountryName] = useState("WorldWide");
  const [countries, setCountries] = useState([]);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setcountryName(countryCode);
    console.log(countryCode);
  };
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER </h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value={countryName}
            onChange={onCountryChange}
          >
            <MenuItem value="WorldWide">WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/*Header*/}
      {/* Title + select input drop down*/}

      {/*Info boxes */}
      {/*Info boxes */}
      {/*Info boxes */}

      {/**Table */}
      {/**Graph */}

      {/**Map */}
    </div>
  );
}

export default App;
