import React from "react";
import { currentIDPropsType } from "../Types/LandingTypes";
import { useAppSelector } from "../Store/Store";
import { coinDataType } from "../Types/AppTypes";
import { useParams } from "react-router";

const IndividualCoinData = ({ currentID }: currentIDPropsType) => {
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );

  const { id } = useParams();

  const filteredCoin = coinData.filter((coin) => id === coin.id);

  const coin = filteredCoin[0];

  return (
    <div className="coin-data-cointainer">
      <figure className="Coin-Name-Logo">
        <img src={coin.image} alt={coin.name} />
        <h2>{coin.name}</h2>
        <span>{coin.symbol}</span>
      </figure>
      <div className="coin-graph"></div>
      <span>{coin.current_price.toLocaleString()}</span>
      <div className="market-cap">
        <h3>Market Cap</h3>
        <h3>Market Cap Rank</h3>
        <span>{coin.market_cap}</span>
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
        <span>{coin.ath_change_percentage}</span>
        <span>{coin.ath_date}</span>
      </div>
      <div className="atl">
        <h3>ATL</h3>
        <h3>ATL %</h3>
        <h3>Date</h3>
        <span>{coin.atl}</span>
        <span>{coin.atl_change_percentage}</span>
        <span>{coin.atl_date}</span>
      </div>
      <span>{coin.total_volume}</span>
    </div>
  );
};

export default IndividualCoinData;
