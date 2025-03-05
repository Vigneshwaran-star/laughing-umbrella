const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./Routes.js");
const connectedDB = require("./database.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api", router);

connectedDB();
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
