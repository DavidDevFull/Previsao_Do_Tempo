import classes from './WeatherInformation.module.css';

export const WeatherInformation = ({ city }) => {
  if (!city) {
    return <p>Digite uma cidade para ver o clima ☀️</p>;
  }

  return (
    <div className={classes.styleContain}>
      <div className={classes.styleDivNumberOne}>
        <h2>{city.name}</h2>
        <div>
          <img src={`http://openweathermap.org/img/wn/${city.icon}.png`} alt="Ícone do clima" />
          <span>{Math.round(city.temp)}ºC</span>
        </div>
        <span>{city.description}</span>
      </div>

      <div className={classes.styleDivNumberTwo}>
        <span>Sensação térmica: {Math.round(city.feels_like)}ºC</span>
        <span>Umidade: {city.humidity}%</span>
        <span>Pressão: {city.pressure} hPa</span>
      </div>
    </div>
  );
};
