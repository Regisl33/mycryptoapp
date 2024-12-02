import React from "react";
import { coinDataType } from "../Types/AppTypes";
import StarFavorite from "./StarFavorite";
import { useNavigate } from "react-router";

type propsType = {
  currentID: number;
  coin: coinDataType;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const TableDataRow = ({
  coin,
  currentID,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{coin.market_cap_rank}</td>
      <StarFavorite
        currentID={currentID}
        coin={coin}
        tempFavArray={tempFavArray}
        setTempFavArray={setTempFavArray}
      />
      <td>{coin.symbol.toUpperCase()}</td>
      <td>
        <img src={coin.image} alt={coin.name} />
      </td>
      <td className="pointer" onClick={() => navigate(`/coin/:${coin.id}`)}>
        {coin.name}
      </td>
      <td>
        {coin.market_cap
          ? coin.market_cap.toString().length > 11
            ? (coin.market_cap / 1000000000).toFixed(3) + "G $"
            : (coin.market_cap / 1000000).toFixed(3) + "M $"
          : "-"}
      </td>
      <td>
        {coin.current_price ? coin.current_price.toLocaleString() + "$" : "-"}
      </td>
      <td>
        {coin.total_volume
          ? coin.total_volume.toString().length > 11
            ? (coin.total_volume / 1000000000).toFixed(3) + "G $"
            : (coin.total_volume / 1000000).toFixed(3) + "M $"
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
