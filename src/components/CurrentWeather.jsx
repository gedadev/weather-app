import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function CurrentWeather({ city = "mexico" }) {
  const [currentWeatherData, setCurrentWeatherData] = useState({});

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=fe635530ff74438bbd623918240702&q=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        const updateData = currentWeatherData;
        updateData.condition = data.current.condition.text;
        updateData.location = data.location.name;
        updateData.icon = data.current.condition.icon;
        updateData.maxTemperature = data.forecast.forecastday[0].day.maxtemp_c;
        updateData.minTemperature = data.forecast.forecastday[0].day.mintemp_c;
        updateData.temperature = data.current.temp_c;
        setCurrentWeatherData(updateData);
      });
  }, [currentWeatherData, city]);

  return (
    <section className="current-weather">
      <p>{currentWeatherData.location}</p>
      <p>{currentWeatherData.condition}</p>
      <p>{currentWeatherData.temperature}</p>
      <img src={currentWeatherData.icon} />
      <p>{currentWeatherData.minTemperature}</p>
      <p>{currentWeatherData.maxTemperature}</p>
    </section>
  );
}

CurrentWeather.propTypes = {
  city: PropTypes.string,
};
