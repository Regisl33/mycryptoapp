import React, { useEffect, useState } from "react";
import { Tooltip, Treemap } from "recharts";
import { useAppSelector, useAppDispatch } from "../Store/Store";
import { fetchGlobalData } from "../Features/CoinGeeckoData/CoinDataSlice";

const TodayRecap = () => {
  const [chartData, setChartData] = useState([]);
  const globalData = useAppSelector((state) => state.coinData.globalData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGlobalData);
  }, []);
  return (
    <div className="GlobalGraph">
      <Treemap
        height={1000}
        width={1000}
        data={chartData}
        // dataKey={size}
        fill="black"
        aspectRatio={1}
      >
        <Tooltip></Tooltip>
      </Treemap>
    </div>
  );
};

export default TodayRecap;
