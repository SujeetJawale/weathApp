import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import xlogo from "../assets/xlogo.webp"; // Ensure this path is correct and the file exists

interface WeatherCodeMap {
  [key: string]: {
    description: string;
  };
}

interface DetailsProps {
  formatedAddress: string;
  formd: any;
  data: any;
  handleToggleClick: () => void;
  lat?: number;
  lng?: number;
}

const Details: React.FC<DetailsProps> = ({ formatedAddress, formd, data, handleToggleClick, lat, lng }) => {
  const details = data.values || data; // `data` is an optional prop
  const latitude = lat ?? 0; // Use default values if `lat` or `lng` is undefined
  const longitude = lng ?? 0;
  const handleToggleClicks = handleToggleClick;
  const address = formatedAddress;

  const [isHovered, setIsHovered] = useState(false);
  let startDate = details.date;
  if (data.startTime) {
    const date = new Date(data.startTime);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    startDate = date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    // Initialize the map when the component mounts
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "", // Replace with your Google Maps API key
        version: "weekly",
      });

      try {
        await loader.load();
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: new google.maps.LatLng(latitude, longitude),
          zoom: 8,
        });

        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          map: map,
        });

        const infowindow = new google.maps.InfoWindow({
          content: "<p>Marker Location:" + marker.getPosition() + "</p>",
        });

        google.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker);
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    // Call the initMap function
    initMap();
  }, [latitude, longitude]);

  function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }

  const weatherCodeMapForImage: WeatherCodeMap = {
    "0": { description: "Unknown" },
    "1000": { description: "Clear, Sunny" },
    "1100": { description: "Mostly Clear" },
    "1101": { description: "Partly Cloudy" },
    "1102": { description: "Mostly Cloudy" },
    "1001": { description: "Cloudy" },
    "2000": { description: "Fog" },
    "2100": { description: "Light Fog" },
    "4000": { description: "Drizzle" },
    "4001": { description: "Rain" },
    "4200": { description: "Light Rain" },
    "4201": { description: "Heavy Rain" },
    "5000": { description: "Snow" },
    "5001": { description: "Flurries" },
    "5100": { description: "Light Snow" },
    "5101": { description: "Heavy Snow" },
    "6000": { description: "Freezing Drizzle" },
    "6001": { description: "Freezing Rain" },
    "6200": { description: "Light Freezing Rain" },
    "6201": { description: "Heavy Freezing Rain" },
    "7000": { description: "Ice Pellets" },
    "7101": { description: "Heavy Ice Pellets" },
    "7102": { description: "Light Ice Pellets" },
    "8000": { description: "Thunderstorm" },
    "9000": { description: "Strong Wind" },
  };

  if (!details) {
    return (
      <div>
        <p>No data available for this location.</p>
      </div>
    );
  }

  return (
    <div className='container-fluid w-200'>
      <div className='d-flex justify-content-between'>
        <button
          onClick={handleToggleClicks}
          style={{
            border: "0.1px solid black",
            backgroundColor: isHovered ? "rgb(212, 210, 210)" : "rgb(251, 251, 251)",
            marginBottom: "2rem",
            borderRadius: "8px",
            paddingLeft: "0.8rem",
            paddingRight: "0.8rem",
            paddingBottom: "0.3rem",
            transition: "background-color 0.3s", // Optional smooth transition
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon
            onClick={handleToggleClicks}
            icon={faChevronLeft}
            style={{
              color: "black",
              fontSize: "13px",
              marginTop: "0.6rem",
              marginBottom: "0rem",
              marginRight: "0.3rem",
              cursor: "pointer",
            }}
          />
          List
        </button>

        <h4>{startDate}</h4>
        {(() => {
          const tweetText = `The temperature in ${address} on ${startDate} is ${
            details.temperatureMax
          }°F. The weather conditions are ${
            weatherCodeMapForImage[details.weatherCode].description
          } #CSCI571WeatherSearch`;

          const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
          return (
            <a
              className='twitter-share-button'
              href={tweetUrl}
              target='_blank'
              style={{
                backgroundColor: "white",
                border: "1px solid gray",
                borderRadius: "8px",
                padding: "0px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                width: "40px",
                height: "40px",
              }}
              aria-label='Close button'
            >
              <img src={xlogo} alt='Twitter logo' style={{ width: "20px", height: "18px" }} />
            </a>
          );
        })()}
      </div>
      <div className='table-responsive'>
        <table className='table table-striped 100w'>
          <tbody>
            <tr>
              <th scope='row'>Status</th>
              <td>{weatherCodeMapForImage[details.weatherCode].description}</td>
            </tr>
            <tr>
              <th scope='row'>Max Temperature</th>
              <td>{details.temperatureMax}°F</td>
            </tr>
            <tr>
              <th scope='row'>Min Temperature</th>
              <td>{details.temperatureMin}°F</td>
            </tr>
            <tr>
              <th scope='row'>Apparent Temperature</th>
              <td>{details.temperatureApparent}°F</td>
            </tr>
            <tr>
              <th scope='row'>Sun Rise Time</th>
              <td>{formatTime(details.sunriseTime)}</td>
            </tr>
            <tr>
              <th scope='row'>Sun Set Time</th>
              <td>{formatTime(details.sunsetTime)}</td>
            </tr>
            <tr>
              <th scope='row'>Humidity</th>
              <td>{details.humidity}%</td>
            </tr>
            <tr>
              <th scope='row'>Wind Speed</th>
              <td>{details.windSpeed}mph</td>
            </tr>
            <tr>
              <th scope='row'>Visibility</th>
              <td>{details.visibility}mi</td>
            </tr>
            <tr>
              <th scope='row'>Cloud Cover</th>
              <td>{details.cloudCover}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id='map' style={{ height: "600px" }}></div>
    </div>
  );
};

export default Details;
