import axios from "axios";
import { useState } from "react";
import Chart from "react-apexcharts";

const CitiesChart = () => {
  const [cityNames, setCityNames] = useState([""]);
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

    try {
      const weatherPromises = cityNames.map((city) => {
        return axios.get(`https://api.weatherapi.com/v1/history.json`, {
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

  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: cititesData.map((data) => data.location.name),
      },
    },
    series: [
      {
        name: "series-1",
        data: cititesData.map((data) => Math.round(data.current.temp_c)),
      },
    ],
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
      <div className="flex">
        <button className="form_btn" onClick={() => setCityNames((prev) => [...prev, ""])}>
          add another city
        </button>
        <button className="form_btn" onClick={()=>setCityNames(["", "", "", "", ""])}>Clear The Form</button>
      </div>
      {isLoading && <h3>Loading...</h3>}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />

      {/* {cititesData &&
        cititesData.map((data, index) => (
          <h2 key={index}>
            {data.location.name}: {Math.round(data.current.temp_c)}
          </h2>
        ))} */}
    </div>
  );
};

export default CitiesChart;
