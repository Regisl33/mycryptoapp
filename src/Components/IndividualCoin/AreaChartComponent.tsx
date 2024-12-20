//Import Dependencies
import { useState, useEffect } from "react";
import axios from "axios";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import Components for the Graph
import AreaChartGraph from "./AreaChartGraph";
//Import Custom Types
import { chartDataType, chartHeaderDataType } from "../../Types/AppTypes";
//Props Type for User ID, Temp Color and Current Coin Data
type propsType = {
  coinID: string;
  tempColor: string;
  currentID: number;
};

const AreaChartComponent = ({ coinID, tempColor, currentID }: propsType) => {
  //Define Chart Data and Duration State
  const [chartData, setChartData] = useState<chartDataType[]>([]);
  const [duration, setDuration] = useState(30);
  //Define headerData
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
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //This useEffect Fetch the Data Using Axios and Store the Usefull Data in the ChartData State
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
  //Header for Our Graph
  const graphHeader = (
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
  );
  //Full Graph Structure
  const fullGraphComponent = (
    <div className="coin-graph">
      {graphHeader}
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

  return fullGraphComponent;
};

export default AreaChartComponent;
