import classes from './PanelForDay.module.css';

export const PanelForDay = ({ imgClimate, temp_min, temp_max, description, date, weekDay }) => {

  return (
    <div className={classes.cardClimate}>
              <span>{weekDay}</span>

      <span>{date}</span>
      <img src={imgClimate} alt="Ícone do clima" />

      <div className={classes.divInfoSpan}>
        <span>{Math.round(temp_min.toFixed(1))}ºC / {Math.round(temp_max.toFixed(1))}ºC</span>
        <span>{description}</span>
      </div>
    </div>
  );
};
