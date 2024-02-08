import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import HourlyCard from "./HourlyCard";
import "../styles/hourlyForecast.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function HourlyForecast({ city = "mexico" }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [slidePosition, setSlidePosition] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState({
    left: true,
    right: false,
  });
  const cardsContainer = useRef(null);

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

  const handleSlide = (position) => {
    slidePosition + position < 0 && slidePosition + position > -2400
      ? setButtonDisabled({ left: false, right: false })
      : slidePosition + position === 0
      ? setButtonDisabled({ left: true, right: false })
      : setButtonDisabled({ left: false, right: true });

    [...cardsContainer.current.children].map((card) => {
      card.style.transform = `translateX(${slidePosition + position}px)`;
    });
    setSlidePosition(slidePosition + position);
  };

  return (
    <section className="hourly-forecast-section">
      <button
        className="arrow-button"
        onClick={() => handleSlide(100)}
        disabled={buttonDisabled.left}
      >
        <KeyboardDoubleArrowLeftIcon className="nav-arrow" />
      </button>
      <div className="cards-container" ref={cardsContainer}>
        {hourlyData.map((data) => (
          <HourlyCard
            key={data.hour}
            hour={data.hour}
            condition={data.condition}
            icon={data.icon}
            temperature={data.temperature}
            chanceOfRain={data.chanceOfRain}
          />
        ))}
      </div>
      <button
        className="arrow-button"
        onClick={() => handleSlide(-100)}
        disabled={buttonDisabled.right}
      >
        <KeyboardDoubleArrowRightIcon className="nav-arrow" />
      </button>
    </section>
  );
}

HourlyForecast.propTypes = {
  city: PropTypes.string,
};
