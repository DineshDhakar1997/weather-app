const express = require("express");
const app = express();
const https = require("https");
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  //   console.log(req.body.CityName);

  const query = req.body.CityName;
  const api_key = "bb5d2c37907a6c945ce4e04a698b725c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api_key}&units=metric`;
  https.get(url, (response) => {
    // console.log(response.statusCode);
    response.on("data", (data) => {
      //   console.log(data);
      const weatherdata = JSON.parse(data);
      //   console.log(weatherdata);
      const temp = weatherdata.main.temp;
      console.log(temp);
      const description = weatherdata.weather[0].description;
      console.log(description);
      res.write(
        `<h1>The temp in ${req.body.CityName} right now is ${temp} deg C</h1>`
      );
      res.write(`<p>${req.body.CityName} weather has ${description} today</p>`);
    });
  });
  //   res.send("checking server");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
