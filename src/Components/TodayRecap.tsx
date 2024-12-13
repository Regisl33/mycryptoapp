//Import Dependencies
import { useCallback, useEffect, useState } from "react";
import { Tooltip, Treemap, TooltipProps } from "recharts";
//Import Custom Function
import { useAppSelector } from "../Store/Store";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { colorPicker } from "../Utils/ColorUtilities";
//Import Custom Types
import { globalChartDataType } from "../Types/AppTypes";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
//Import Close "X" Icon
import { TiDeleteOutline } from "react-icons/ti";
//props Type for the UserID and tempBackgroundColor
type propsType = {
  tempColor: string;
  currentID: number;
};

const TodayRecap = ({ tempColor, currentID }: propsType) => {
  //State for the Data we pass to the Treemap
  const [chartData, setChartData] = useState<globalChartDataType[]>([]);
  //Boolen State to control the display of the treemap in mobile mode
  const [displayChart, setDisplayChart] = useState(false);
  //Get Coin Data
  const coinData = useAppSelector((state) => state.coinData.data);
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Function that takes the coin Data and makes a new array to pass to the treemap using chartData state
  const dataManager = useCallback(() => {
    //Spreading the data to be able to modify it and define the new array variable that we are going to populate and pass to our state
    let data = [...coinData];
    let newArray: globalChartDataType[] = [];
    //Sort and Slice the data to get the 45 best market cap coin and map those coin to push their name, price, market cap and color to the state
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
    //Set the state
    setChartData(newArray);
  }, [coinData]);
  //UseEffect sets the chartData state using dataManager
  useEffect(() => {
    dataManager();
  }, [dataManager]);
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //Return the custom tooltip for both treemap
  const TreemapTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length > 0) {
      //display the name and price for the coin with custom Style
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
  //Treemap for BigScreens
  const bigTreemap = (
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
  );
  //Treemap for mobile settings
  const littleTreemap = (
    <div className="smallGlobalGraph">
      {/* button to close the mobile screen treemap using the displayChart state */}
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
  );
  //Button to show the mobile screen treemap using the displayChart State
  const showLittleTreemapBtn = (
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
  );
  //treemap display based on screen size and display chart state
  const treemapReturn = (
    <div className="treemap-container">
      {bigTreemap}
      {displayChart ? littleTreemap : showLittleTreemapBtn}
    </div>
  );

  return treemapReturn;
};

export default TodayRecap;
