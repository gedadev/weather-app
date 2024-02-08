import PropTypes from "prop-types";

export default function DailyCard({
  icon,
  date,
  minTemperature,
  maxTemperature,
  sunrise,
  sunset,
  moonPhase,
}) {
  return (
    <div className="daily-card">
      <img src={icon} />
      <span>{date}</span>
      <span>{minTemperature}</span>
      <span>{maxTemperature}</span>
      <span>{sunrise}</span>
      <span>{sunset}</span>
      <span>{moonPhase}</span>
    </div>
  );
}

DailyCard.propTypes = {
  icon: PropTypes.string,
  date: PropTypes.string,
  minTemperature: PropTypes.number,
  maxTemperature: PropTypes.number,
  sunrise: PropTypes.string,
  sunset: PropTypes.string,
  moonPhase: PropTypes.string,
};
