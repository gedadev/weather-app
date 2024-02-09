import "./styles/App.css";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCity(
            `${position.coords.latitude.toFixed(
              4
            )},${position.coords.longitude.toFixed(4)}`
          );
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const submitCity = () => {
    setCity(search);
  };

  return (
    <>
      <header>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search City"
            autoComplete="off"
            value={search}
            onChange={handleInput}
          />
          <button type="button" onClick={submitCity}>
            <SearchIcon />
          </button>
        </div>
      </header>
      {!city ? (
        <Loader />
      ) : (
        <>
          <CurrentWeather city={city} />
          <HourlyForecast city={city} />
          <DailyForecast city={city} />
        </>
      )}
    </>
  );
}

export default App;
