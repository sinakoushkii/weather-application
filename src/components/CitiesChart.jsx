// import axios from "axios";
import { useState } from "react";;
import { getLastFiveDaysTemperatureForCities } from "../utility";
import ReactApexChart from "react-apexcharts";

const CitiesChart = () => {
  const [cityNames, setCityNames] = useState([""]);
  const [cititesData, setCititesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   const wheatherKey = import.meta.env.VITE_WEATHER_API_KEY;

  const handleCityNameChange = (index, value) => {
    const newCityNames = [...cityNames];
    newCityNames[index] = value;
    setCityNames(newCityNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await getLastFiveDaysTemperatureForCities(cityNames);
    // console.log(result)
    const finallResult = Object.entries(result).map(([key, value]) => ({
      city: key,
      temperatures: value,
    }));
    
    // console.log(finallResult);
    setCititesData(finallResult);

    setIsLoading(false);
  };

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
        <button
          className="form_btn"
          onClick={() => setCityNames((prev) => [...prev, ""])}
        >
          add another city
        </button>
        <button
          className="form_btn"
          onClick={() => setCityNames(["", "", "", "", ""])}
        >
          Clear The Form
        </button>
      </div>
      {isLoading && <h3>Loading...</h3>}
      {cititesData && (
        <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
      )}
      {/* <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      /> */}

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
