/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import { getAll } from "./services/country";
import { getWeather } from "./services/weather";

function CountryWithWeather({ country }) {
  const [latitude, longitude] = country.latlng;
  const [weather, setWeather] = useState({});
  const capital = country.capital ? country.capital[0] : country.name.common;

  useEffect(() => {
    getWeather({ lat: latitude, lon: longitude }).then(res => setWeather(res));
  }, [latitude, longitude]);

  return (
    <>
      <Country country={country} />
      <Weather weather={weather} capital={capital} />
    </>
  );
}

function Weather({ weather, capital }) {
  if (Object.keys(weather).length === 0) {
    return <p>loading...</p>;
  }

  const icon = weather.weather[0].icon;
  const wind = weather.wind.speed;

  const tempInKelvin = weather.main.temp;
  const tempInCelsius = Math.floor(tempInKelvin - 273.15);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {tempInCelsius} Celsius</p>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={`Current weather of ${capital}`}
        />
      </div>
      <p>wind {wind} m/s</p>
    </div>
  );
}

function Country({ country }) {
  const capital = country.capital ? country.capital[0] : country.name.common;
  const flag = country.flags.svg ? country.flags.svg : country.flags.png;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <div style={{ marginBlock: "1.5rem" }}>
        <img src={flag} alt={country.flags.alt} style={{ width: "100%" }} />
      </div>
    </div>
  );
}

function Countries({ countries }) {
  const [showCountry, setShowCountry] = useState("");

  if (countries.length === 0) {
    return <p>No country found</p>;
  }

  if (countries.length === 1) {
    return <CountryWithWeather country={countries[0]} />;
  }

  return countries.length > 10 ? (
    <p>Too many mathces, specify another filter</p>
  ) : (
    <ul>
      {countries.map(country => {
        const name = country.name.common;
        return (
          <li key={name}>
            <span>{name}</span>
            {showCountry === name ? (
              <button type='button' onClick={() => setShowCountry("")}>
                close
              </button>
            ) : (
              <button type='button' onClick={() => setShowCountry(name)}>
                show
              </button>
            )}
            {showCountry === name ? (
              <Country country={country} key={name} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAll().then(initialCountries => {
      setCountries(initialCountries);
    });
  }, []);

  const filteredCountries = search
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLocaleLowerCase())
      )
    : [];

  return (
    <div>
      <label htmlFor='countries'>find countries</label>
      <input
        type='text'
        name='countries'
        id='countries'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
