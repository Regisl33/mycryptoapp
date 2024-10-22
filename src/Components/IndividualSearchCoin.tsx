import React from "react";
import { coinDataType } from "../Types/AppTypes";

type propsType = {
  coin: coinDataType;
};

const IndividualSearchCoin = ({ coin }: propsType) => {
  return (
    <div className="search-coin">
      <figure className="logo-container">
        <h2>{coin.name}</h2>
        <img src={coin.image} alt={coin.name + "'s image"} />
        <figcaption>{coin.symbol}</figcaption>
        <span>
          {coin.price_change_percentage_24h_in_currency.toFixed(1) + "%"}
        </span>
      </figure>
      <div className="coin-info-container">
        <table>
          <tbody>
            <tr>
              <th>Market Cap</th>
              <td>{coin.market_cap}</td>
              <th>Market Cap Rank</th>
              <td>{coin.market_cap_rank}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{coin.current_price.toLocaleString() + "$"}</td>
              <th>Volume</th>
              <td>{coin.total_volume}</td>
            </tr>
            <tr>
              <th>Ath</th>
              <td>{coin.ath_change_percentage.toFixed(1) + "%"}</td>
              <th>Ath Date</th>
              <td>{coin.ath_date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndividualSearchCoin;
