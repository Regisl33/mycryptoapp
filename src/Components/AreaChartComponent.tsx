import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  TooltipProps,
} from "recharts";
import { chartDataType, chartHeaderDataType } from "../Types/AppTypes";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type propsType = {
  coinID: string;
  tempColor: string;
  currentID: number;
};

const AreaChartComponent = ({ coinID, tempColor, currentID }: propsType) => {
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
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    let newArray: chartDataType[] = [];
    try {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=${duration}${
            duration > 32 ? "&interval=daily" : ""
          }`
        )
        .then((res) => {
          for (let i: number = 0; i < res.data.prices.length; i++) {
            let price = res.data.prices[i][1];

            newArray.push({
              date: new Date(res.data.prices[i][0]).toLocaleDateString(),
              price: price < "50" ? price : parseInt(price),
            });
          }
          setChartData(newArray);
        });
    } catch (err) {
      console.log(err);
    }
  }, [coinID, duration]);

  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length > 0) {
      return (
        <div
          className={
            tempColor.length > 0
              ? tempColor[0] === "D"
                ? "dark-tooltip"
                : "light-tooltip"
              : userData?.color[0] === "D"
              ? "dark-tooltip"
              : "#light-tooltip"
          }
        >
          <p>{payload[0].payload.date}</p>
          <p>{payload[0].payload.price.toLocaleString()}$</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="coin-graph">
      <ul>
        {headerData.map((header) => {
          return (
            <li
              className={
                duration === header.duration
                  ? tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "active darkLink"
                      : "active lightLink"
                    : userData?.color[0] === "D"
                    ? "active darkLink"
                    : "active lightLink"
                  : tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "darkLink"
                    : "lightLink"
                  : userData?.color[0] === "D"
                  ? "darkLink"
                  : "lightLink"
              }
              key={header.label}
              onClick={() => setDuration(header.duration)}
            >
              {header.label}
            </li>
          );
        })}
      </ul>

      <AreaChart
        className="Big-Graph"
        width={800}
        height={250}
        data={chartData}
        margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="7%"
              stopColor={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "#fffaf7"
                    : "#000000"
                  : userData?.color[0] === "D"
                  ? "#fffaf7"
                  : "#000000"
              }
              stopOpacity={0.8}
            />
            <stop
              offset="93%"
              stopColor={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "#000000"
                    : "#fffaf7"
                  : userData?.color[0] === "D"
                  ? "#000000"
                  : "#fffaf7"
              }
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="price"
          stroke={
            tempColor.length > 0
              ? tempColor[0] === "D"
                ? "#fffaf7"
                : "#000000"
              : userData?.color[0] === "D"
              ? "#fffaf7"
              : "#000000"
          }
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
      <AreaChart
        className="Little-Graph"
        width={350}
        height={450}
        data={chartData}
        margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="7%"
              stopColor={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "#fffaf7"
                    : "#000000"
                  : userData?.color[0] === "D"
                  ? "#fffaf7"
                  : "#000000"
              }
              stopOpacity={0.8}
            />
            <stop
              offset="93%"
              stopColor={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "#000000"
                    : "#fffaf7"
                  : userData?.color[0] === "D"
                  ? "#000000"
                  : "#fffaf7"
              }
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="price"
          stroke={
            tempColor.length > 0
              ? tempColor[0] === "D"
                ? "#fffaf7"
                : "#000000"
              : userData?.color[0] === "D"
              ? "#fffaf7"
              : "#000000"
          }
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartComponent;
