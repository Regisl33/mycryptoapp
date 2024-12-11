import { useEffect } from "react";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  TooltipProps,
} from "recharts";
import { chartDataType } from "../Types/AppTypes";

type propsType = {
  currentID: number;
  tempColor: string;
  chartData: chartDataType[];
};

const AreaChartGraph = ({ currentID, tempColor, chartData }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  const getGraphColor = (): string => {
    let color = "";
    tempColor.length > 0
      ? tempColor[0] === "D"
        ? (color = "#fffaf7")
        : (color = "#000000")
      : userData?.color[0] === "D"
      ? (color = "#fffaf7")
      : (color = "#000000");

    return color;
  };

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
    <AreaChart
      width={800}
      height={250}
      data={chartData}
      margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="7%" stopColor={getGraphColor()} stopOpacity={0.8} />
          <stop offset="93%" stopColor={getGraphColor()} stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="date"
        tick={{
          fill: getGraphColor(),
        }}
        tickLine={{
          stroke: getGraphColor(),
        }}
      />
      <YAxis
        domain={["auto", "auto"]}
        tick={{
          fill: getGraphColor(),
        }}
        tickLine={{
          stroke: getGraphColor(),
        }}
      />
      <CartesianGrid
        strokeDasharray="3 3"
        opacity={0.5}
        stroke={getGraphColor()}
      />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="price"
        stroke={getGraphColor()}
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};

export default AreaChartGraph;
