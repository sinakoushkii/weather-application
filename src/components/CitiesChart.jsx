// import axios from "axios";
import { useState } from "react";
import { getLastFiveDaysTemperatureForCities } from "../utility";
import ReactApexChart from "react-apexcharts";

const CitiesChart = () => {
  const [city, setCity] = useState("");
  const [cityNames, setCityNames] = useState([]);
  const [cititesData, setCititesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCityNameChange = () => {
    setCityNames((prev) => setCityNames([...prev, city]));
    setCity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await getLastFiveDaysTemperatureForCities(cityNames);
    const finallResult = Object.entries(result).map(([key, value]) => ({
      city: key,
      temperatures: value,
    }));

    setCititesData(finallResult);
    setIsLoading(false);
  };

  const handleDeleteCity=(cityName)=>{
    const allCities=cityNames
    const filteredCities=allCities.filter(city=>city!==cityName)
    setCityNames(filteredCities)
  }

  // Extract the dates (assumes all cities have the same dates)
  const dates = cititesData[0]?.temperatures.map((data) => data.date) || [];

  // Prepare the series data for the chart
  const chartSeries = cititesData.map((cityData) => ({
    name: cityData.city, // City name as the series name
    data: cityData.temperatures.map((tempData) => tempData.temperature), // Temperatures for the city
  }));

  // Chart options
  const chartOptions = {
    chart: {
      id: "temperature-chart",
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: dates, // Dates on the X-axis
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    title: {
      text: "Temperature Over Last 5 Days for Each City",
      align: "center",
    },
    stroke: {
      curve: "smooth", // Smooth lines
    },
    markers: {
      size: 5, // Size of markers on the lines
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <div className="data_wrapper">
      <div className="flex space-between">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input_wrapper">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={`Enter City name`}
            />
          </div>
          <button className="form_btn" type="submit">
            Submitt
          </button>
        </form>
        <div className="cities_list">
          <ul>
            {cityNames &&
              cityNames.map((city) => (
                <li key={city}>
                  {city}
                  <span onClick={()=>handleDeleteCity(city)} className="delete_btn">X</span>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex">
          <button className="form_btn" onClick={() => handleCityNameChange()}>
            add city
          </button>
        </div>
      </div>

      {isLoading && <h3 className="loading">Loading...</h3>}
      {cititesData && (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
          width={600}
        />
      )}
    </div>
  );
};

export default CitiesChart;
