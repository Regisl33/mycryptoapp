import React, { useEffect, useState } from "react";
import { Tooltip, Treemap, TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { useAppSelector } from "../Store/Store";
import { globalChartDataType } from "../Types/AppTypes";

const TodayRecap = () => {
  const [chartData, setChartData] = useState<globalChartDataType[]>([]);
  const coinData = useAppSelector((state) => state.coinData.data);

  const dataManager = () => {
    let data = [...coinData];
    let newArray: globalChartDataType[] = [];

    data
      .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
      .slice(0, 45)
      .map((coin) =>
        newArray.push({
          name: coin.name,
          price: coin.current_price,
          size: coin.market_cap,
        })
      );

    setChartData(newArray);
  };

  useEffect(() => {
    dataManager();
  }, []);

  const TreemapTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="tooltip-container">
          <p>
            {payload[0].payload.name}
            <span>{payload[0].payload.price}</span>
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="GlobalGraph">
      <Treemap
        height={1000}
        width={1000}
        data={chartData}
        dataKey="size"
        stroke="white"
        fill="black"
        aspectRatio={1}
      >
        <Tooltip content={<TreemapTooltip />} />
      </Treemap>
    </div>
  );
};

export default TodayRecap;
