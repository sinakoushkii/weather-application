import axios from "axios";

const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentDate = () => {
  const today = new Date();
  const dateOnly = today.toISOString().split("T")[0];
  return dateOnly;
};

export const getLastFiveDates = () => {
  const dates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }
  return dates;
};

export const getFirstAndLastDayOfCurrentMonth=()=>{
  const now = new Date();

  // Get the first day of the current month
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  // Get the last day of the current month
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  // Format the date as YYYY-MM-DD without timezone issues
  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return {
    firstDay: formatDate(firstDay),
    lastDay: formatDate(lastDay),
  };
}

export const getLastFiveDaysTemperatureForCities = async (cities) => {
  const cityTemperatures = {};

  for (const city of cities) {
    const temperatures = [];
    // const dates = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i); // Subtract `i` days from today

      // Format the date as YYYY-MM-DD
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/history.json`,
          {
            params: {
              key: weatherKey,
              q: city,
              dt: formattedDate,
            },
          }
        );

        // Get the specific temperature for each day (e.g., max temp)
        const temp = response.data.forecast.forecastday[0].day.avgtemp_c; // You can change this to `mintemp_c` or `avgtemp_c` if needed
        temperatures.push({ date: formattedDate, temperature: temp });
      } catch (error) {
        console.error(
          `Error fetching data for ${city} on ${formattedDate}:`,
          error
        );
        temperatures.push({ date: formattedDate, temperature: null }); // Push null if there's an error for that day
      }
    }

    // Store the temperatures array in the result object for the current city
    cityTemperatures[city] = temperatures;
  }

  return cityTemperatures;
};
