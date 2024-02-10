import PropTypes from "prop-types";
import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";

export default function HourlyCard({
  hour,
  condition,
  icon,
  temperature,
  chanceOfRain,
}) {
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const readableTime = date.getHours();
    return readableTime;
  };

  return (
    <div className="hourly-card">
      <p>{convertTimestamp(hour)}:00</p>
      <p>{condition}</p>
      <img src={icon} />
      <p>{Math.floor(temperature)}°c</p>
      <p>
        <ThunderstormOutlinedIcon />: {chanceOfRain}%
      </p>
    </div>
  );
}

HourlyCard.propTypes = {
  hour: PropTypes.number,
  condition: PropTypes.string,
  icon: PropTypes.string,
  temperature: PropTypes.number,
  chanceOfRain: PropTypes.number,
};
