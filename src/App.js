import "./App.css";
import React from 'react';
import { FormControl, Select, MenuItem } from "@material-ui/core";
import {useState} from 'react';

function App() {
  const [countries, setCountries] = useState([
    'USA', 'UK', 'India', 'China'
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER </h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="xyz">
            {
              countries.map(country => (
                <MenuItem value={country}>{country}</MenuItem>
              ))
            }
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
