import React, { useState } from "react";
import { fetchWeather } from "./Api/WeatherApi";
import axios from "axios"; 


const API_KEY = "a747f2ff4d68e136a41265ac5becf65e"; 

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const searchWeather = async () => {
    if (!city) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log(`📍 Location: ${lat}, ${lon}`);

          const data = await fetchWeather(lat, lon);
          setWeather(data);
        },
        (error) => {
          console.error("❌ Error getting location:", error);
          alert("Please enable location services or enter a city manually.");
        }
      );
    } else {
    
      const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

      try {
        const geoResponse = await axios.get(geocodeURL);
        if (geoResponse.data.length > 0) {
          const { lat, lon } = geoResponse.data[0];
          console.log(`🌍 City Coordinates: ${lat}, ${lon}`);

          const data = await fetchWeather(lat, lon);
          setWeather(data);
        } else {
          alert("City not found. Try another name.");
        }
      } catch (error) {
        console.error("❌ Error fetching city coordinates:", error);
      }
    }
  };

  return (
    <>
      <div className="flex bg-[url(perfect-weather-with-gradient-sky-ym0nn79vhoqg34v3.jpg)] bg-cover h-screen justify-center ">
        <div className=" grid ">
          <h1 className="text-white lg:text-7xl font-bold">
            Laughing☂️Umberalla
          </h1>
          <div>
            <input
              type="text"
              value={city}
              placeholder="Enter city name"
              onChange={(e) => setCity(e.target.value)}
              className="bg-white text-black h-10 w-96 rounded-lg"
            />
            <button
              onClick={searchWeather}
              className="text-white cursor-pointer border-2 ml-2"
            >
              Search
            </button>
          </div>
          <div className="text-black bg-white opacity-90 rounded-lg mb-40 flex justify-center w-96 hover:scale-110 ">
            {weather && (
              <div className="weather-box justify-between gap-5 mt-20 ">
                <h2 className="text-3xl font-extrabold">
                  {weather.city}, {weather.country}
                </h2>
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt="Weather Icon"
                  className="w-40 h-40"
                />
                <p className="text-2xl font-black">
                  Temperature: {weather.temperature}°C
                </p>
                <p className="text-xl font-medium">{weather.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
