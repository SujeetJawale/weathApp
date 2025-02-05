import { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

interface TemperatureData {
  date: string; // The date in string format (e.g., ISO string)
  temperatureMin: number; // Minimum temperature for the day
  temperatureMax: number; // Maximum temperature for the day
}

interface DailyTempChartProps {
  data: TemperatureData[]; // Array of temperature data
}

const DailyTempChart: React.FC<DailyTempChartProps> = ({ data }) => {
  const transformedData = data.map((interval) => {
    const timestamp = new Date(interval.date).getTime();
    const tempMin = interval.temperatureMin;
    const tempMax = interval.temperatureMax;

    return [timestamp, tempMin, tempMax] as [number, number, number];
  });

  useEffect(() => {
    if (transformedData && transformedData.length) {
      Highcharts.chart("chart1", {
        chart: {
          type: "arearange",
          zooming: {
            type: "x",
          },
          scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1,
          },
        },
        title: {
          text: "Temperature Ranges (Min, Max)",
        },
        xAxis: {
          type: "datetime",
          crosshair: true, // Place crosshair here, not in tooltip
          accessibility: {
            rangeDescription: "Range: Jan 1st 2017 to Dec 31 2017.",
          },
        },
        yAxis: {
          title: {
            text: null,
          },
        },
        tooltip: {
          shared: true,
          valueSuffix: "°F",
          xDateFormat: "%A, %b %e",
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "Temperatures",
            data: transformedData,
            type: "arearange", // Explicitly set the type
            color: {
              linearGradient: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 1,
              },
              stops: [
                [0, "#ffa500"],
                [1, "#C5E5FB"],
              ],
            },
          },
        ],
      });
    }
  }, [transformedData]);

  return <div id='chart1' className='mb-sm-5' style={{ width: "auto", height: "auto" }} />;
};

export default DailyTempChart;
