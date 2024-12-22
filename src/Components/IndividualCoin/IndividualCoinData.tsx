//Import Dependencies
import { useEffect } from "react";
import { useParams } from "react-router";
//Import Custom Hooks and Functions
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
import { colorPicker } from "../../Utils/ColorUtilities";
//Import Custom Types useSelector
import { useAppSelector } from "../../Store/Store";
//Import Graph, DisplayValue and Favorite Switch Components
import AreaChartComponent from "./AreaChartComponent";
import DisplayOfValue from "../DisplayOfValue";
import FavoriteSwitch from "../SearchPage/FavoriteSwitch";
//Import Custom Type
import { coinDataType, IDColorTempFavArrPropsType } from "../../Types/AppTypes";

const IndividualCoinData = ({
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: IDColorTempFavArrPropsType) => {
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Get Coin Data
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  //Define CoinID from UseParams
  const { coinID } = useParams<{ coinID: string }>();
  //Get the Current Coin Info From the CoinID Param
  const filteredCoin = coinData.filter((coin) => coinID?.slice(1) === coin.id);
  const coin = filteredCoin[0];
  //This Function Displays the According Shadow With the Title Class
  const getTitleShadow = (): string => {
    let classes = "";
    tempColor.length > 0
      ? tempColor[0] === "D"
        ? (classes = "title Dshadow")
        : (classes = "title Lshadow")
      : userData?.color[0] === "D"
      ? (classes = "title Dshadow")
      : (classes = "title Lshadow");

    return classes;
  };
  //This Function Displays the According Shadow
  const getShadow = (): string => {
    let classes = "";
    tempColor.length > 0
      ? tempColor[0] === "D"
        ? (classes = "Dshadow")
        : (classes = "Lshadow")
      : userData?.color[0] === "D"
      ? (classes = "Dshadow")
      : (classes = "Lshadow");

    return classes;
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  const fullPageStructure = (
    <div className="main-container">
      {coin && (
        <div className="coin-container">
          <div className="top-container">
            <div className="empty-container"></div>
            <div className="logo-container">
              <figure className="Coin-Name-Logo">
                <img src={coin.image} alt={coin.name} />
                <h2 className={getTitleShadow()}>{coin.name}</h2>
                <figcaption>{`(${coin.symbol.toUpperCase()})`}</figcaption>
              </figure>
            </div>
            <FavoriteSwitch
              currentID={currentID}
              coin={coin}
              tempFavArray={tempFavArray}
              setTempFavArray={setTempFavArray}
              getShadow={getShadow}
            />
          </div>
          <AreaChartComponent
            coinID={coin.id}
            tempColor={tempColor}
            currentID={currentID}
          />
          <p className="center">
            <span className={getShadow()}>Price:</span>{" "}
            {coin.current_price.toLocaleString()}$
          </p>
          <div className="grid-container">
            <div className="grid-container2">
              <h3 className={getTitleShadow()}>Market Cap:</h3>
              <DisplayOfValue value={coin.market_cap} valueType="$" />
              <h3 className={getTitleShadow()}>Market Cap Rank:</h3>
              <span>{coin.market_cap_rank}</span>
            </div>
            <div className="grid-container2">
              <h3 className={getTitleShadow()}>Total Supply:</h3>
              <DisplayOfValue valueType="$" value={coin.total_supply} />
              <h3 className={getTitleShadow()}>Max Supply:</h3>
              <DisplayOfValue valueType="$" value={coin.max_supply} />
              <h3 className={getTitleShadow()}>Circulating Supply:</h3>
              <DisplayOfValue valueType="$" value={coin.circulating_supply} />
            </div>
            <div className="grid-container2">
              <h3 className={getTitleShadow()}>ATH:</h3>
              <span>{coin.ath.toLocaleString()}$</span>
              <h3 className={getTitleShadow()}>ATH %:</h3>
              <DisplayOfValue
                valueType="Date"
                value={coin.ath_change_percentage}
              />
              <h3 className={getTitleShadow()}>Date:</h3>
              <span>{coin.ath_date.slice(0, 10)}</span>
            </div>
            <div className="grid-container2">
              <h3 className={getTitleShadow()}>ATL:</h3>
              <span>{coin.atl.toLocaleString()}$</span>
              <h3 className={getTitleShadow()}>ATL %:</h3>
              <span style={{ color: colorPicker(coin.atl_change_percentage) }}>
                {coin.atl_change_percentage.toFixed(1) + "%"}
              </span>
              <h3 className={getTitleShadow()}>Date:</h3>
              <span>{coin.atl_date.slice(0, 10)}</span>
            </div>
          </div>
          <p className="center">
            <span className={getTitleShadow()}>Volume : </span>
            <DisplayOfValue valueType="$" value={coin.total_volume} />
          </p>
        </div>
      )}
    </div>
  );

  return fullPageStructure;
};

export default IndividualCoinData;
