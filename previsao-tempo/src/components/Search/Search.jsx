import { useState, useRef } from 'react';
import axios from 'axios';

import classes from './Search.module.css';
import { WeatherInformation } from '../WatherInformation/WatherInformation';
import { ErrorRequest } from '../ErrorRequest/ErrorRequest';
import { NextFiveDays } from '../NextFiveDays/NextFiveDays';

import { getInfoClimate } from '../getInfoClimate';

export const Search = () => {
  const inputRef = useRef();
  const [cityName, setCityName] = useState('');
  const [cityData, setCityData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function searchCity() {
    const inputCity = inputRef.current.value.trim();

    if (!inputCity) return;

    const key = '2b710e07f7c4de612a3066ef3b55c6c3';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const response = await axios.get(url);
      const filteredData = getInfoClimate(response.data);

      setCityName(inputCity);
      setCityData(filteredData);
      setErrorMsg('');
    } catch (error) {
      setCityData(null);
      setCityName('');

      if (error.response?.status === 404) {
        setErrorMsg('❌ Cidade não encontrada! Verifique o nome digitado.');
      } else {
        setErrorMsg('⚠️ Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  }

  return (
    <div className={classes.containInformationClimate}>
      <h1>Previsão do tempo</h1>
      <div>
        <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
        <button onClick={searchCity}>Buscar</button>
      </div>

      <div>
        {cityData && <WeatherInformation city={cityData} />}
        {cityName && <NextFiveDays city={cityName} />}
        {errorMsg && <ErrorRequest message={errorMsg} />}
      </div>
    </div>
  );
};