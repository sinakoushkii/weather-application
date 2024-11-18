import axios from "axios";
import { useState } from "react";

const CitiesChart = () => {
  const [cityNames, setCityNames] = useState(["", "", "", "", ""]);
  const [cititesData, setCititesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const wheatherKey = import.meta.env.VITE_WEATHER_API_KEY;

  const handleCityNameChange = (index, value) => {
    const newCityNames = [...cityNames];
    newCityNames[index] = value;
    setCityNames(newCityNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Filter out empty city names
    // const validCities = cityNames.filter((city) => city.trim() !== "");
    // console.log(validCities)
    // if (validCities.length === 0) {
    //   alert("Please enter at least one city.");
    //   return;
    // }

    try {
      const weatherPromises = cityNames.map((city) => {
        return axios.get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: wheatherKey,
            q: city,
          },
        });
      });
  
      const resposes = await Promise.all(weatherPromises);
        resposes.map((response) =>
          setCititesData((prev) => [...prev, response.data])
        );
      console.log(resposes);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input_wrapper">
          {cityNames.map((cityName, index) => (
            <input
              key={index}
              type="text"
              value={cityName}
              onChange={(e) => handleCityNameChange(index, e.target.value)}
              placeholder={`Enter City ${index + 1}`}
            />
          ))}
        </div>
        <button className="form_btn" type="submit">
          Submitt
        </button>
      </form>
      {isLoading && <h3>Loading...</h3>}
      {cititesData &&
        cititesData.map((data, index) => (
          <h2 key={index}>
            {data.location.name}: {Math.round(data.current.temp_c)}
          </h2>
        ))}
    </div>
  );
};

export default CitiesChart;
