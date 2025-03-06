import axios from "axios";

const Api_url = "https://laughing-umbrella-kucz.onrender.com/api/weather";

export const fetchWeather = async (lat, lon) => {
  try {
    const API_KEY = "47f5bb3a88cdba96d030e021282a6356";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    console.log("API Response:", response.data);

    const weatherData = {
      city: response.data.name, 
      country: response.data.sys.country,
      temperature: Math.floor(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    };

    await axios.post(Api_url, weatherData);

    return weatherData;
  } catch (error) {
    console.error(
      "❌ Error fetching weather data:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
