/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import { getAll } from "./services/country";

function Country({ country }) {
  const capitals = country.capital.join(", ");
  const flag = country.flags.svg ? country.flags.svg : country.flags.png;
  return (
    <div>
      <h1>{country.name.common}</h1>
      <ul>
        <li>capital {capitals}</li>
        <li>area {country.area}</li>
      </ul>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <div>
        <img src={flag} alt={country.flags.alt} style={{ width: "100%" }} />
      </div>
    </div>
  );
}

function Countries({ countries }) {
  if (countries.length === 0) {
    return <p>No country found</p>;
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return countries.length > 10 ? (
    <p>Too many mathces, specify another filter</p>
  ) : (
    <ul>
      {countries.map(country => {
        return <li key={country.name.common}>{country.name.common}</li>;
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

  console.log("filteredCountries >> ", filteredCountries);

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
