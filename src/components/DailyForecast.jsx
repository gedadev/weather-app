import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function DailyForecast({ city = "mexico" }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=fe635530ff74438bbd623918240702&q=${city}&days=3`
    )
      .then((response) => response.json())
      .then((data) => getData(data));
  }, [city]);

  const getData = (data) => {
    const days = data.forecast.forecastday;
    const updateData = days.map((day) => {
      return {
        date: day.date,
        minTemperature: day.day.mintemp_c,
        maxTemperature: day.day.maxtemp_c,
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
        moonPhase: day.astro.moon_phase,
      };
    });

    setDailyData(updateData);
  };

  return <></>;
}

DailyForecast.propTypes = {
  city: PropTypes.string,
};
