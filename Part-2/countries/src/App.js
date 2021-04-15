import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);

    let filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredCountries.length === 1) {
      let weatherParams = {
        access_key: "c54c7600a7e6b2a1708c92ab7fe5037b",
        query: `${filteredCountries[0].capital}`,
      };

      console.log(weatherParams);

      axios
        .get("https://api.weatherstack.com/current", { weatherParams })
        .then((response) => {
          console.log(response.data);
        });
    }
    console.log(filteredCountries);

    setCountries(filteredCountries);
  };

  return (
    <div>
      find countries
      <input value={searchValue} onChange={handleChange} />
      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countries.length < 10 &&
        countries.length > 1 &&
        countries.map((country, i) => {
          return <div key={i}>{country.name}</div>;
        })}
      {countries.length === 1 && (
        <div>
          <h2>{countries[0].name}</h2>
          capital: {countries[0].capital} <br />
          population: {countries[0].population}
          <h3>languages</h3>
          <ul>
            {countries[0].languages.map((language, i) => {
              return <li key={i}>{language.name}</li>;
            })}
          </ul>
          <img src={`${countries[0].flag}`} alt="flag" width="80px" />
        </div>
      )}
    </div>
  );
}

export default App;
