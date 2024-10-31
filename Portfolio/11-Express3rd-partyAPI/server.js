require("dotenv").config();

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  const cityName = req.body.cityName;
  const apiKey = process.env.WEATHER;
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      let dataChunks = [];

      response.on("data", (chunk) => {
        dataChunks.push(chunk);
      });

      response.on("end", () => {
        try {
          const weatherData = JSON.parse(Buffer.concat(dataChunks));
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          res.render("result", { cityName, temp, description, iconUrl });
        } catch (error) {
          res.send("Error parsing weather data.");
        }
      });
    } else {
      res.send("City not found. Please try again.");
    }
  }).on("error", (e) => {
    res.send(`An error occurred: ${e.message}`);
  });
});

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
