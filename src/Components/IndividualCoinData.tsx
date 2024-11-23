import React, { useEffect } from "react";
import { useAppSelector } from "../Store/Store";
import { coinDataType } from "../Types/AppTypes";
import { useParams } from "react-router";
import AreaChartComponent from "./AreaChartComponent";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";

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
      {coin && (
        <>
          <figure className="Coin-Name-Logo">
            <img src={coin.image} alt={coin.name} />
            <h2>{coin.name}</h2>
            <span>{coin.symbol.toUpperCase()}</span>
          </figure>
          <div className="coin-graph">
            <AreaChartComponent coinID={coin.id} name={coin.name} />
          </div>
          <span>{coin.current_price.toLocaleString()}$</span>
          <div className="market-cap">
            <h3>Market Cap</h3>
            <h3>Market Cap Rank</h3>
            <span>
              {coin.market_cap
                ? (coin.market_cap / 1000000).toFixed(3) + "M $"
                : "-"}
            </span>
            <span>{coin.market_cap_rank}</span>
          </div>
          <div className="supply">
            <h3>Total Supply</h3>
            <h3>Max Supply</h3>
            <h3>Circulating Supply</h3>
            <span>{coin.total_supply}</span>
            <span>{coin.max_supply}</span>
            <span>{coin.circulating_supply}</span>
          </div>
          <div className="ath">
            <h3>ATH</h3>
            <h3>ATH %</h3>
            <h3>Date</h3>
            <span>{coin.ath}</span>
            <span>{coin.ath_change_percentage.toFixed(1) + "%"}</span>
            <span>{coin.ath_date.slice(0, 10)}</span>
          </div>
          <div className="atl">
            <h3>ATL</h3>
            <h3>ATL %</h3>
            <h3>Date</h3>
            <span>{coin.atl}</span>
            <span>{coin.atl_change_percentage.toFixed(1) + "%"}</span>
            <span>{coin.atl_date.slice(0, 10)}</span>
          </div>
          <span>
            {coin.total_volume
              ? (coin.total_volume / 1000000).toFixed(3) + "M $"
              : "-"}
          </span>
        </>
      )}
    </div>
  );
};

export default IndividualCoinData;
