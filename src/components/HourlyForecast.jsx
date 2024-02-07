import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function HourlyForecast({ city = "mexico" }) {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=fe635530ff74438bbd623918240702&q=${city}&days=2`
    )
      .then((response) => response.json())
      .then((data) => getData(data));
  }, [city]);

  const getData = (data) => {
    const updateData = [];
    const localTime = data.location.localtime_epoch;
    const days = data.forecast.forecastday;

    days.forEach((day) => {
      day.hour.forEach((hour) => {
        if (hour.time_epoch > localTime && updateData.length < 24) {
          updateData.push({
            temperature: hour.temp_c,
            condition: hour.condition.text,
            icon: hour.condition.icon,
            chanceOfRain: hour.chance_of_rain,
            hour: hour.time_epoch,
          });
        }
      });
    });

    setHourlyData(updateData);
  };

  return (
    <section className="hourly-forecast-section">
      {hourlyData.map((data) => (
        <div key={data.hour}>
          <p>{data.hour}</p>
          <p>{data.condition}</p>
          <img src={data.icon} />
          <p>{data.temperature}</p>
          <p>{data.chanceOfRain}</p>
        </div>
      ))}
    </section>
  );
}

HourlyForecast.propTypes = {
  city: PropTypes.string,
};
