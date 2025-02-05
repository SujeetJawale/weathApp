import React, { useState } from "react";
import WeatherTable from "./WeatherTable";
import DailyTempChart from "./DailyTempChart";
import Meteogram from "./MeteogramChart";

interface ListProps {
  data: any; // Replace with actual data type
  meto: any;
  intervals: any; // Replace with actual intervals type
  setDetails: (details: any) => void; // Replace with actual type for setDetails
  meteoData: any; // Replace with actual Meteogram data type
  lat: number; // Latitude of the location
  lng: number; // Longitude of the location
}

const List: React.FC<ListProps> = ({ data, intervals, meto, setDetails, meteoData, lat, lng }) => {
  const [activeTab, setActiveTab] = useState<"dailyView" | "dailyTempChart" | "meteogram">("dailyView");

  let humidity: number[] = [];
  let wind: number[] = [];
  let temperature: number[] = [];
  let pressure: number[] = [];
  let date: Date[] = [];
  meteoData.data.timelines[1].intervals.map((item: any) => {
    date.push(new Date(item.startTime));
    humidity.push(item.values.humidity);
    wind.push(item.values.windSpeed);
    temperature.push(item.values.temperature);
    pressure.push(item.values.pressureSeaLevel);
  });
  //   if (meteoData && Array.isArray(meto)) {
  //     humidity = meto.map((item) => item.values.humidity);
  //     wind = meto.map((item) => item.values.windSpeed);
  //     temperature = meto.map((item) => item.values.temperature);
  //     pressure = meto.map((item) => item.values.pressureSeaLevel);
  //   }

  const handleTabClick = (tab: "dailyView" | "dailyTempChart" | "meteogram") => {
    setActiveTab(tab);
  };

  return (
    <>
      <ul className='nav nav-tabs justify-content-end'>
        <li className='nav-item'>
          <a
            className={`nav-link ${activeTab === "dailyView" ? "active" : ""}`}
            onClick={() => handleTabClick("dailyView")}
            style={{ cursor: "pointer" }}
          >
            Daily View
          </a>
        </li>
        <li className='nav-item'>
          <a
            className={`nav-link ${activeTab === "dailyTempChart" ? "active" : ""}`}
            onClick={() => handleTabClick("dailyTempChart")}
            style={{ cursor: "pointer" }}
          >
            Daily Temp. Chart
          </a>
        </li>
        <li className='nav-item'>
          <a
            className={`nav-link ${activeTab === "meteogram" ? "active" : ""}`}
            onClick={() => handleTabClick("meteogram")}
            style={{ cursor: "pointer" }}
          >
            Meteogram
          </a>
        </li>
      </ul>

      <div id='content'>
        {activeTab === "dailyView" && (
          <WeatherTable data={data} setDetails={setDetails} intervals={intervals} />
        )}
        {activeTab === "dailyTempChart" && <DailyTempChart data={data} />}
        {activeTab === "meteogram" && (
          <Meteogram
            data={{
              date: date,
              humidity: humidity,
              wind: wind,
              temperature: temperature,
              pressure: pressure,
            }}
          />
        )}
      </div>
    </>
  );
};

export default List;
