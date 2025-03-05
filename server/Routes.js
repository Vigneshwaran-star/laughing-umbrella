const express = require("express");
const router = express.Router();
const {
  createWeather,
  fetchWeather,
} = require("./controller/WeatherControl.js");

router.post("/weather", createWeather); // ✅ Match frontend route
router.get("/weather", fetchWeather); // ✅ Match frontend route

module.exports = router;
