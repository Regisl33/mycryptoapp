import React, { useEffect } from "react";
import { useAppSelector } from "../Store/Store";
import { coinDataType } from "../Types/AppTypes";
import { useParams } from "react-router";
import AreaChartComponent from "./AreaChartComponent";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import Header from "./Header";
import Footer from "./Footer";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const IndividualCoinData = ({
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );

  const { coinID } = useParams<{ coinID: string }>();

  const filteredCoin = coinData.filter((coin) => coinID?.slice(1) === coin.id);

  const coin = filteredCoin[0];

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  return (
    <div
      className={
        tempColor.length > 0 && tempColor !== userData?.color
          ? tempColor
          : userData?.color
      }
    >
      <Header currentID={currentID} tempColor={tempColor} />
      {coin && (
        <div className="main-container">
          <figure className="Coin-Name-Logo">
            <img src={coin.image} alt={coin.name} />
            <h2
              className={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                  : userData?.color[0] === "D"
                  ? "title Dshadow"
                  : "title Lshadow"
              }
            >
              {coin.name}
            </h2>
            <figcaption>{`(${coin.symbol.toUpperCase()})`}</figcaption>
          </figure>
          <div className="coin-graph">
            <AreaChartComponent
              coinID={coin.id}
              tempColor={tempColor}
              currentID={currentID}
            />
          </div>
          <p className="center">{coin.current_price.toLocaleString()}$</p>
          <div className="grid-container">
            <div className="grid-container2">
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Market Cap:
              </h3>
              <span>
                {coin.market_cap
                  ? (coin.market_cap / 1000000).toFixed(3) + "M $"
                  : "-"}
              </span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Market Cap Rank:
              </h3>
              <span>{coin.market_cap_rank}</span>
            </div>
            <div className="grid-container2">
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Total Supply:
              </h3>
              <span>
                {coin.total_supply
                  ? (coin.total_supply / 1000000).toFixed(3) + "M $"
                  : "-"}
              </span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Max Supply:
              </h3>
              <span>
                {coin.max_supply
                  ? (coin.max_supply / 1000000).toFixed(3) + "M $"
                  : "-"}
              </span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Circulating Supply:
              </h3>
              <span>
                {coin.circulating_supply
                  ? (coin.circulating_supply / 1000000).toFixed(3) + "M $"
                  : "-"}
              </span>
            </div>
            <div className="grid-container2">
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                ATH:
              </h3>
              <span>{coin.ath.toLocaleString()}$</span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                ATH %:
              </h3>
              <span>{coin.ath_change_percentage.toFixed(1) + "%"}</span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Date:
              </h3>
              <span>{coin.ath_date.slice(0, 10)}</span>
            </div>
            <div className="grid-container2">
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                ATL:
              </h3>
              <span>{coin.atl.toLocaleString()}$</span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                ATL %:
              </h3>
              <span>{coin.atl_change_percentage.toFixed(1) + "%"}</span>
              <h3
                className={
                  tempColor.length > 0
                    ? tempColor[0] === "D"
                      ? "title Dshadow"
                      : "title Lshadow"
                    : userData?.color[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                }
              >
                Date:
              </h3>
              <span>{coin.atl_date.slice(0, 10)}</span>
            </div>
          </div>
          <p className="center">
            <span
              className={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "title Dshadow"
                    : "title Lshadow"
                  : userData?.color[0] === "D"
                  ? "title Dshadow"
                  : "title Lshadow"
              }
            >
              Volume :{" "}
            </span>
            {coin.total_volume
              ? (coin.total_volume / 1000000).toFixed(3) + "M $"
              : "-"}
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default IndividualCoinData;
