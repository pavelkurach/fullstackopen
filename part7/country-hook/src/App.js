import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  console.log(name);

  const url = country => `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;

  useEffect(() => {
    axios
      .get(url(name))
      .then(response => {
        console.log(response.data.name);
        setCountry({ found: true, data: response.data });
      })
      .catch(error => {
        setCountry({ found: false });
      });
  }, [name]);

  if (name === '') {
    return null;
  }

  if (!country) {
        return null;
    }

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    );
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flags.png} height='100'
           alt={`flag of ${country.data.name.common}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;