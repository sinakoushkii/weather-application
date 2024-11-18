import axios from "axios";
import {useState } from "react";
import CitiesChart from "./components/CitiesChart";

const App = () => {
  const wheatherKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [cityName, setCityName] = useState("");
  const [cityData, setCityData] = useState(null);

  const name = cityData?.location?.name;
  const temp_c = cityData?.current?.temp_c;

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.weatherapi.com/v1/current.json`, {
        params: {
          key: wheatherKey,
          q: cityName,
        },
      })
      .then((response) => setCityData(response.data));
  };

  return (
    <div className="container">
      <CitiesChart />
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter City Name"
        />
      </form>

      <div>
        <h2>City Info</h2>
        {cityData ? (
          <h3>
            {name}: {Math.round(temp_c)} c
          </h3>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
