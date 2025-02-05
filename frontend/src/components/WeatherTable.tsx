import React from "react";
import clearDayIcon from "../assets/clear_day.svg";
import mostlyClearDayIcon from "../assets/mostly_clear_day.svg";
import partlyCloudyDayIcon from "../assets/partly_cloudy_day.svg";
import mostlyCloudyIcon from "../assets/mostly_cloudy.svg";
import cloudyIcon from "../assets/cloudy.svg";
import fogIcon from "../assets/fog.svg";
import lightFogIcon from "../assets/fog_light.svg";
import drizzleIcon from "../assets/drizzle.svg";
import rainIcon from "../assets/rain.svg";
import lightRainIcon from "../assets/rain_light.svg";
import heavyRainIcon from "../assets/rain_heavy.svg";
import snowIcon from "../assets/snow.svg";
import flurriesIcon from "../assets/flurries.svg";
import lightSnowIcon from "../assets/snow_light.svg";
import heavySnowIcon from "../assets/snow_heavy.svg";
import freezingDrizzleIcon from "../assets/freezing_drizzle.svg";
import freezingRainIcon from "../assets/freezing_rain.svg";
import lightFreezingRainIcon from "../assets/freezing_rain_light.svg";
import heavyFreezingRainIcon from "../assets/freezing_rain_heavy.svg";
import icePelletsIcon from "../assets/ice_pellets.svg";
import heavyIcePelletsIcon from "../assets/ice_pellets_heavy.svg";
import lightIcePelletsIcon from "../assets/ice_pellets_light.svg";
import thunderstormIcon from "../assets/tstorm.svg";
import strongWindIcon from "../assets/strong-wind.png";
import "./Search.css";

// Define the shape of interval data
interface Interval {
  date: string;
  weatherCode: string;
  temperatureMax: number;
  temperatureMin: number;
  windSpeed: number;
}

// Define the shape of the props
interface WeatherTableProps {
  data: Interval[]; // Array of interval objects
  setDetails: (interval: Interval) => void; // Function to set the details of a specific interval
  intervals: Interval[]; // Array of intervals
}

const WeatherTable: React.FC<WeatherTableProps> = ({ data, setDetails }) => {
  // Map of weather codes to descriptions and image sources
  const weatherCodeMapForImage: Record<string, { description: string; imgSrc: string }> = {
    "0": { description: "Unknown", imgSrc: "" },
    "1000": { description: "Clear", imgSrc: clearDayIcon },
    "1100": { description: "Mostly Clear", imgSrc: mostlyClearDayIcon },
    "1101": { description: "Partly Cloudy", imgSrc: partlyCloudyDayIcon },
    "1102": { description: "Mostly Cloudy", imgSrc: mostlyCloudyIcon },
    "1001": { description: "Cloudy", imgSrc: cloudyIcon },
    "2000": { description: "Fog", imgSrc: fogIcon },
    "2100": { description: "Light Fog", imgSrc: lightFogIcon },
    "4000": { description: "Drizzle", imgSrc: drizzleIcon },
    "4001": { description: "Rain", imgSrc: rainIcon },
    "4200": { description: "Light Rain", imgSrc: lightRainIcon },
    "4201": { description: "Heavy Rain", imgSrc: heavyRainIcon },
    "5000": { description: "Snow", imgSrc: snowIcon },
    "5001": { description: "Flurries", imgSrc: flurriesIcon },
    "5100": { description: "Light Snow", imgSrc: lightSnowIcon },
    "5101": { description: "Heavy Snow", imgSrc: heavySnowIcon },
    "6000": { description: "Freezing Drizzle", imgSrc: freezingDrizzleIcon },
    "6001": { description: "Freezing Rain", imgSrc: freezingRainIcon },
    "6200": { description: "Light Freezing Rain", imgSrc: lightFreezingRainIcon },
    "6201": { description: "Heavy Freezing Rain", imgSrc: heavyFreezingRainIcon },
    "7000": { description: "Ice Pellets", imgSrc: icePelletsIcon },
    "7101": { description: "Heavy Ice Pellets", imgSrc: heavyIcePelletsIcon },
    "7102": { description: "Light Ice Pellets", imgSrc: lightIcePelletsIcon },
    "8000": { description: "Thunderstorm", imgSrc: thunderstormIcon },
    "9000": { description: "Strong Wind", imgSrc: strongWindIcon },
  };

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Date</th>
          <th scope='col'>Status</th>
          <th scope='col'>Temp. High(°F)</th>
          <th scope='col'>Temp. Low(°F)</th>
          <th scope='col'>
            Wind Speed <span className='desktop-only'>(mph)</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 7).map((interval, index) => {
          const weatherInfo = weatherCodeMapForImage[interval.weatherCode] || weatherCodeMapForImage["0"];

          return (
            <tr key={index} style={{ borderBottomWidth: "1px" }}>
              <th style={{ borderBottom: "0px" }}>{index + 1}</th>
              <td
                style={{
                  paddingRight: "1rem",
                  overflowX: "auto",
                  borderBottom: "0px",
                }}
              >
                <div
                  className='text-primary mobile-width'
                  style={{ cursor: "pointer", marginRight: "0.3rem" }}
                  onClick={() => {
                    setDetails(interval);
                  }}
                >
                  <u>{interval.date}</u>
                </div>
              </td>
              <td className='d-flex' style={{ borderBottom: "0px" }}>
                <img
                  className='img-fluid'
                  src={weatherInfo.imgSrc}
                  alt={`${weatherInfo.description}`}
                  style={{ maxWidth: "1.5rem", height: "auto" }}
                />
                <span style={{ marginRight: "1rem" }}>{weatherInfo.description}</span>
              </td>
              <td style={{ borderBottom: "0px" }}>{interval.temperatureMax}</td>
              <td style={{ borderBottom: "0px" }}>{interval.temperatureMin}</td>
              <td style={{ borderBottom: "0px" }}>{interval.windSpeed}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WeatherTable;
