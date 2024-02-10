import PropTypes from "prop-types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import NightlightIcon from "@mui/icons-material/Nightlight";

export default function DailyCard({
  icon,
  date,
  minTemperature,
  maxTemperature,
  sunrise,
  sunset,
  moonPhase,
}) {
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dateString = date.toLocaleDateString();
    const [month, day, year] = dateString.split("/");

    return { month, day, year };
  };

  return (
    <div className="daily-card">
      <div className="day-temperature">
        <span>
          {convertTimestamp(date).day}/{convertTimestamp(date).month}
        </span>
        <img src={icon} />
        <span>
          <ArrowDropDownIcon />: {minTemperature}°c
        </span>
        <span>
          <ArrowDropUpIcon />: {maxTemperature}°c
        </span>
      </div>
      <div className="day-astro">
        <span>
          <WbSunnyOutlinedIcon />: {sunrise}
        </span>
        <span>
          <WbTwilightIcon />: {sunset}
        </span>
        <span>
          <NightlightIcon />: {moonPhase}
        </span>
      </div>
    </div>
  );
}

DailyCard.propTypes = {
  icon: PropTypes.string,
  date: PropTypes.number,
  minTemperature: PropTypes.number,
  maxTemperature: PropTypes.number,
  sunrise: PropTypes.string,
  sunset: PropTypes.string,
  moonPhase: PropTypes.string,
};
