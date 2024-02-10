import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DailyCard from "./DailyCard";
import "../styles/dailyForecast.css";

export default function DailyForecast({ city }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=fe635530ff74438bbd623918240702&q=${city}&days=5`
    )
      .then((response) => response.json())
      .then((data) => getData(data));
  }, [city]);

  const getData = (data) => {
    const days = data.forecast.forecastday;
    const updateData = days.map((day) => {
      return {
        date: day.date_epoch,
        icon: day.day.condition.icon,
        minTemperature: day.day.mintemp_c,
        maxTemperature: day.day.maxtemp_c,
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        moonPhase: day.astro.moon_phase,
      };
    });

    setDailyData(updateData);
  };

  return (
    <div className="daily-forecast-section">
      <h2>Daily Forecast</h2>
      {dailyData.map((day) => (
        <DailyCard
          key={day.date}
          icon={day.icon}
          date={day.date}
          minTemperature={day.minTemperature}
          maxTemperature={day.maxTemperature}
          sunrise={day.sunrise}
          sunset={day.sunset}
          moonPhase={day.moonPhase}
        />
      ))}
    </div>
  );
}

DailyForecast.propTypes = {
  city: PropTypes.string,
};
