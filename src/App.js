import "./App.css";
import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Maps";
import Table from './components/Table'

function App() {
  const [countryName, setcountryName] = useState("WorldWide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setcountryInfo] = useState({});
  const [tableData, settableData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
      });
  }, []);
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    console.log(countryCode);

    //url
    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountryName(countryCode);
        setcountryInfo(data);
      });
  };

  console.log("country info", countryInfo);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          settableData(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__left">
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

        <div className="app__stats">
          <InfoBox
            title=" COVID-19 Active Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/*Header*/}
        {/* Title + select input drop down*/}

        {/*Info boxes */}
        {/*Info boxes */}
        {/*Info boxes */}

        <Map />
        {/**Map */}
      </div>
      <Card className="app_right">
        <CardContent>
          {/** Table*/}
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          {/**Graph */}
          <h3>WorldWide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
