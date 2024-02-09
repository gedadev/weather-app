import "./styles/App.css";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("mexico");

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
      <CurrentWeather city={city} />
      <HourlyForecast city={city} />
      <DailyForecast city={city} />
    </>
  );
}

export default App;
