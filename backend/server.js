require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const axios = require("axios");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const FavoriteSchema = new mongoose.Schema({
  city: String,
  state: String,
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.post("/favorites", async (req, res) => {
  const { city, state } = req.body;
  const newFavorite = new Favorite({ city, state });
  await newFavorite.save();
  res.json(newFavorite);
});

app.get("/favorites", async (req, res) => {
  const favorites = await Favorite.find();
  res.json(favorites);
});

app.delete("/favorites/:id", async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

app.get("/geoLocation", async (req, res) => {
  try {
    const location = req.query.location;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: location,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching geolocation data");
  }
});

app.get("/autoComplete", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
      params: {
        input: keyword,
        types: "locality",
        key: process.env.GOOGLE_API_KEY,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching autocomplete suggestions");
  }
});

app.get("/weather", async (req, res) => {
  const latitude = req.query.lat;
  const longitude = req.query.lng;

  const url = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature&fields=temperatureApparent&fields=temperatureMin&fields=temperatureMax&fields=windSpeed&fields=windDirection&fields=humidity&fields=pressureSeaLevel&fields=uvIndex&fields=weatherCode&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=moonPhase&fields=cloudCover&units=imperial&timesteps=1h&timesteps=1d&timezone=America%2FLos_Angeles&apikey=${process.env.TOM_API_KEY}`; // Store Tomorrow.io API key in .env

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("/weatherapp", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(process.env.PORT || 8080, () => console.log("Server listening on port 8080!"));
