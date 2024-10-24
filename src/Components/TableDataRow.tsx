import React from "react";
import { coinDataType } from "../Types/AppTypes";
import { FaRegStar } from "react-icons/fa6";

type propsType = {
  coin: coinDataType;
};

const TableDataRow = ({ coin }: propsType) => {
  return (
    <tr>
      <td>{coin.market_cap_rank}</td>
      <td>
        <FaRegStar />
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>
        <img src={coin.image} alt={`${coin.name} image`} />
      </td>
      <td>{coin.name}</td>
      <td>
        {coin.market_cap ? (coin.market_cap / 1000000).toFixed(3) + "M $" : "-"}
      </td>
      <td>
        {coin.current_price ? coin.current_price.toLocaleString() + "$" : "-"}
      </td>
      <td>
        {coin.total_volume
          ? (coin.total_volume / 1000000).toFixed(3) + "M $"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_1h_in_currency
          ? coin.price_change_percentage_1h_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_24h_in_currency
          ? coin.price_change_percentage_24h_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_7d_in_currency
          ? coin.price_change_percentage_7d_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_14d_in_currency
          ? coin.price_change_percentage_14d_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_30d_in_currency
          ? coin.price_change_percentage_30d_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_200d_in_currency
          ? coin.price_change_percentage_200d_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.price_change_percentage_1y_in_currency
          ? coin.price_change_percentage_1y_in_currency.toFixed(1) + "%"
          : "-"}
      </td>
      <td>
        {coin.ath_change_percentage
          ? coin.ath_change_percentage > -1
            ? "ATH"
            : coin.ath_change_percentage.toFixed(1) + "%"
          : "-"}
      </td>
    </tr>
  );
};

export default TableDataRow;
