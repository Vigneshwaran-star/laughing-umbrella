const Weather = require("../model/Schema");

const createWeather = async (req, res) => {
  try {
    const { city, country, description, temperature, icon } = req.body;
    if (!city || !country || !temperature || !description || !icon) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newWeather = new Weather({
      city,
      country,
      temperature,
      description,
      icon,
    });
    await newWeather.save();

    console.log("✅ Weather Data Saved:", newWeather);
    res.status(201).json(newWeather);
  } catch (error) {
    console.error("❌ Error saving weather:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchWeather = async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.json(weatherData);
  } catch (error) {
    console.error("❌ Error fetching weather:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createWeather, fetchWeather };
