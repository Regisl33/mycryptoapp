import { useState, useEffect } from "react";
import axios from "axios";
import { chartDataType, chartHeaderDataType } from "../Types/AppTypes";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import AreaChartGraph from "./AreaChartGraph";

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
      <div className="BigGraph">
        <AreaChartGraph
          currentID={currentID}
          tempColor={tempColor}
          chartData={chartData}
        />
      </div>
      <div className="Little-Graph">
        <AreaChartGraph
          currentID={currentID}
          tempColor={tempColor}
          chartData={chartData}
        />
      </div>
    </div>
  );
};

export default AreaChartComponent;
