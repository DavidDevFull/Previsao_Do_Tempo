import { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './NextFiveDays.module.css';
import { PanelForDay } from './PanelForDay/PanelForDay';

export const NextFiveDays = ({ city }) => {
  const [nextFiveWeather, setNextWeather] = useState(null);

  // 🔁 Função movida para fora do useEffect

useEffect(() => {
  if (!city) return;

  const key = '2b710e07f7c4de612a3066ef3b55c6c3';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

  async function fetchForecast() {
    try {
      const response = await axios.get(url);
      const dailyForecast = {};

      for (let forecast of response.data.list) {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString("pt-BR");

        if (!dailyForecast[day]) {
          dailyForecast[day] = {
            forecasts: [],
          };
        }
        dailyForecast[day].forecasts.push(forecast);
      }

      const nextFiveDays = Object.values(dailyForecast)
        .slice(0, 5)
        .map((dataGroup) => {
          const temp_mins = dataGroup.forecasts.map((f) => f.main.temp_min);
          const temp_maxs = dataGroup.forecasts.map((f) => f.main.temp_max);

          const midForecast = dataGroup.forecasts.find((f) => {
            const hour = new Date(f.dt * 1000).getHours();
            return hour >= 11 && hour <= 14;
          }) || dataGroup.forecasts[Math.floor(dataGroup.forecasts.length / 2)];

          return {
            date: new Date(midForecast.dt * 1000).toLocaleDateString("pt-BR"),
            weekDay: new Date(midForecast.dt * 1000).toLocaleDateString("pt-BR", {
              weekday: 'long',
            }),
            temp_min: Math.min(...temp_mins),
            temp_max: Math.max(...temp_maxs),
            description: midForecast.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${midForecast.weather[0].icon}@2x.png`,
          };
        });

      setNextWeather(nextFiveDays);
    } catch (error) {
      console.error('Erro ao buscar previsão de 5 dias:', error);
      setNextWeather(null);
    }
  }

  fetchForecast();
}, [city]);

  return (
    <div className={classes.containNextDays}>
      <h3>Previsão para os próximos 5 dias</h3>
      <div>
        {nextFiveWeather &&
          nextFiveWeather.map((day, index) => (
            <PanelForDay
              key={index}
              weekDay={day.weekDay}
              imgClimate={day.icon}
              temp_min={day.temp_min}
              temp_max={day.temp_max}
              description={day.description}
              date={day.date}
            />
          ))}
      </div>
    </div>
  );
};
