import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { chartDataType, chartHeaderDataType } from "../Types/AppTypes";

type propsType = {
  coinID: string;
  name: string;
};

const AreaChartComponent = ({ coinID, name }: propsType) => {
  const [chartData, setChartData] = useState<chartDataType[]>([]);
  const [duration, setDuration] = useState(30);
  const headerData: chartHeaderDataType[] = [
    { duration: 1, label: "1 Day" },
    { duration: 3, label: "3 Days" },
    { duration: 7, label: "1 Week" },
    { duration: 30, label: "1 Month" },
    { duration: 181, label: "6 Months" },
    { duration: 365, label: "1 Year" },
    { duration: 3000, label: "Max" },
  ];

  const coinFetch_URL = `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=${duration}${
    duration > 32 ? "&interval=daily" : ""
  }`;

  useEffect(() => {
    let newArray: chartDataType[] = [];
    try {
      axios.get(coinFetch_URL).then((res) => {
        for (let i: number = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          newArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < "50" ? price : parseInt(price),
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setChartData(newArray);
    }
  }, [coinFetch_URL]);

  return (
    <div className="areachart">
      <h2>{name}</h2>
      <ul>
        {headerData.map((header) => {
          return (
            <li key={header.label} onClick={() => setDuration(header.duration)}>
              {header.label}
            </li>
          );
        })}
      </ul>
      <AreaChart
        width={680}
        height={250}
        data={chartData}
        margin={{ top: 10, right: 0, left: 100, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="7%" stopColor="black" stopOpacity={0.8} />
            <stop offset="93%" stopColor="white" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke="white"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartComponent;
