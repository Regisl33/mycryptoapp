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
    </div>
  );
};

export default IndividualCoinData;
