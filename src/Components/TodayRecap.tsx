import { useCallback, useEffect, useState } from "react";
import { Tooltip, Treemap, TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { useAppSelector } from "../Store/Store";
import { globalChartDataType } from "../Types/AppTypes";
import { TiDeleteOutline } from "react-icons/ti";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { colorPicker } from "../Utils/ColorUtilities";

type propsType = {
  tempColor: string;
  currentID: number;
};

const TodayRecap = ({ tempColor, currentID }: propsType) => {
  const [chartData, setChartData] = useState<globalChartDataType[]>([]);
  const [displayChart, setDisplayChart] = useState(false);
  const coinData = useAppSelector((state) => state.coinData.data);
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  const dataManager = useCallback(() => {
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
          fill: colorPicker(coin.price_change_percentage_24h_in_currency),
        })
      );

    setChartData(newArray);
  }, [coinData]);

  useEffect(() => {
    dataManager();
  }, [dataManager]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  const TreemapTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="tooltip-container">
          <p>
            {payload[0].payload.name}
            <span>{payload[0].payload.price.toLocaleString()}$</span>
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="GlobalGraph">
        <Treemap
          height={450}
          width={800}
          data={chartData}
          dataKey="size"
          stroke="black"
          fill="black"
          aspectRatio={1}
        >
          <Tooltip content={<TreemapTooltip />} />
        </Treemap>
      </div>

      {displayChart ? (
        <div className="smallGlobalGraph">
          <span>
            <TiDeleteOutline onClick={() => setDisplayChart(false)} />
          </span>
          <Treemap
            height={667}
            width={375}
            data={chartData}
            dataKey="size"
            stroke="black"
            fill="black"
            aspectRatio={1}
          >
            <Tooltip content={<TreemapTooltip />} />
          </Treemap>
        </div>
      ) : (
        <button
          className={
            tempColor.length > 0
              ? tempColor[0] === "D"
                ? `${tempColor}-btn Dbtn graph-btn`
                : `${tempColor}-btn Lbtn graph-btn`
              : userData?.color[0] === "D"
              ? `${userData?.color}-btn Dbtn graph-btn`
              : `${userData?.color}-btn Lbtn graph-btn`
          }
          onClick={() => setDisplayChart(true)}
        >
          Show Today's Graph
        </button>
      )}
    </>
  );
};

export default TodayRecap;
