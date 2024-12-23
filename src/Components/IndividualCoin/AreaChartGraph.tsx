//Import Dependencies
import { useEffect } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  TooltipProps,
} from "recharts";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import Custom Type
import { chartDataType } from "../../Types/AppTypes";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
//Props Type for UserID, TempColor and ChartData
type propsType = {
  currentID: string;
  tempColor: string;
  chartData: chartDataType[];
  width: number;
  height: number;
};

const AreaChartGraph = ({
  currentID,
  tempColor,
  chartData,
  height,
  width,
}: propsType) => {
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //This Function Display the Appropriate Color to our Graph
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
  //Create Tooltip for our Graph
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
              : "light-tooltip"
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
  //Full Area Chart Graph
  const fullAreaChart = (
    <AreaChart
      width={width}
      height={height}
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

  return fullAreaChart;
};

export default AreaChartGraph;
