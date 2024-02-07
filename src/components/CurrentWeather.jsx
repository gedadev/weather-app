import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

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
      <p className="current-location">
        <img src={currentWeatherData.icon} className="current-icon" />
        {currentWeatherData.location}
        <img src={currentWeatherData.icon} className="current-icon" />
      </p>
      <p className="current-condition">{currentWeatherData.condition}</p>
      <p
        className="current-temperature"
        // eslint-disable-next-line react/no-unknown-property
        units="c"
      >{`${currentWeatherData.temperature}°`}</p>
      <div className="current-minmax-temp">
        <span className="temp-icon">
          <ArrowDropDownIcon />:{`${currentWeatherData.minTemperature}°c`}
        </span>
        <span className="temp-icon">
          <ArrowDropUpIcon />:{`${currentWeatherData.maxTemperature}°c`}
        </span>
      </div>
    </section>
  );
}

CurrentWeather.propTypes = {
  city: PropTypes.string,
};
