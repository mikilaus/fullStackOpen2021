import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [weatherDataTemp, setWeatherDataTemp] = useState("");
  const [weatherDataWeatherIcon, setWeatherDataWeatherIcon] = useState("10d");
  const [weatherDataWind, setWeatherDataWind] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);

    let filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredCountries.length === 1) {
      let weatherCity = filteredCountries[0].capital;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        .then((response) => {
          setWeatherDataTemp(response.data.main.temp);
          setWeatherDataWeatherIcon(response.data.weather[0].icon);
          setWeatherDataWind(response.data.wind.speed);
        });
    }

    setCountries(filteredCountries);
  };

  const showCountry = (name) => {
    let selectedCountry = countries.filter((country) => country.name === name);
    setCountries(selectedCountry);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry[0].capital}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        setWeatherDataTemp(response.data.main.temp);
        setWeatherDataWeatherIcon(response.data.weather[0].icon);
        setWeatherDataWind(response.data.wind.speed);
      });
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
          return (
            <div key={i}>
              <span>{country.name}</span>
              <button onClick={() => showCountry(country.name)}>show</button>
            </div>
          );
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
          <img src={countries[0].flag} alt="flag" width="80px" />
          <div>
            <h3>Weather in {countries[0].name}</h3>
            <p>temperature: {weatherDataTemp} Celcius</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherDataWeatherIcon}@2x.png`}
              alt="weather-icon"
              width="80px"
            />
            <p>wind: {weatherDataWind} mps</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
