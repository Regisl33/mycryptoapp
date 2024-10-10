import React from "react";
import { coinDataType } from "../Types/AppTypes";

type propsType = {
  coin: coinDataType;
};

const TableDataRow = ({ coin }: propsType) => {
  return (
    <tr>
      <td>{coin.market_cap_rank}</td>
      <td>{coin.symbol}</td>
      <td>
        <img src={coin.image} alt={`${coin.name} image`} />
      </td>
      <td>{coin.name}</td>
      <td>{coin.market_cap}</td>
      <td>{coin.current_price}</td>
      <td>{coin.total_volume}</td>
      <td>{coin.price_change_percentage_1h_in_currency}</td>
      <td>{coin.price_change_percentage_24h_in_currency}</td>
      <td>{coin.price_change_percentage_7d_in_currency}</td>
      <td>{coin.price_change_percentage_14d_in_currency}</td>
      <td>{coin.price_change_percentage_30d_in_currency}</td>
      <td>{coin.price_change_percentage_200d_in_currency}</td>
      <td>{coin.price_change_percentage_1y_in_currency}</td>
      <td>{coin.ath_change_percentage}</td>
    </tr>
  );
};

export default TableDataRow;
