import React from "react";
import { coinDataType } from "../Types/AppTypes";
import StarFavorite from "./StarFavorite";
import { useNavigate } from "react-router";

type propsType = {
  currentID: number;
  coin: coinDataType;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
  displayData: string;
};

const SmallTableDataRow = ({
  currentID,
  coin,
  tempFavArray,
  setTempFavArray,
  displayData,
}: propsType) => {
  const navigate = useNavigate();

  const dataColums = (): JSX.Element => {
    switch (displayData) {
      case "Market Cap":
        return (
          <td>
            {coin.market_cap
              ? coin.market_cap.toString().length > 11
                ? (coin.market_cap / 1000000000).toFixed(3) + "G $"
                : (coin.market_cap / 1000000).toFixed(3) + "M $"
              : "-"}
          </td>
        );
      case "Price":
        return (
          <td>
            {coin.current_price
              ? coin.current_price.toLocaleString() + "$"
              : "-"}
          </td>
        );
      case "Volume":
        return (
          <td>
            {coin.total_volume
              ? coin.total_volume.toString().length > 11
                ? (coin.total_volume / 1000000000).toFixed(3) + "G $"
                : (coin.total_volume / 1000000).toFixed(3) + "M $"
              : "-"}
          </td>
        );
      case "1h":
        return (
          <td>
            {coin.price_change_percentage_1h_in_currency
              ? coin.price_change_percentage_1h_in_currency.toFixed(1) + "%"
              : "-"}
          </td>
        );
      case "1j":
        return (
          <td>
            {coin.price_change_percentage_24h_in_currency
              ? coin.price_change_percentage_24h_in_currency.toFixed(1) + "%"
              : "-"}
          </td>
        );
      case "7j":
        return (
          <td>
            {coin.price_change_percentage_7d_in_currency
              ? coin.price_change_percentage_7d_in_currency.toFixed(1) + "%"
              : "-"}
          </td>
        );
      case "14j":
        return (
          <td>
            {coin.price_change_percentage_14d_in_currency
              ? coin.price_change_percentage_14d_in_currency.toFixed(1) + "%"
              : "-"}
          </td>
        );
      case "30j":
        return (
          <td>
            {coin.price_change_percentage_30d_in_currency
              ? coin.price_change_percentage_30d_in_currency.toFixed(1) + "%"
              : "-"}
          </td>
        );
      case "200j":
        return (
          <td>
            {coin.price_change_percentage_200d_in_currency
              ? coin.price_change_percentage_200d_in_currency.toFixed(1) + "%"
              : "-"}
          </td>
        );
      case "1y":
        return (
          <td>
            {coin.price_change_percentage_1y_in_currency
              ? coin.price_change_percentage_1y_in_currency.toFixed(1) + "%"
              : "-"}
          </td>
        );
      case "Ath":
        return (
          <td>
            {coin.ath_change_percentage
              ? coin.ath_change_percentage > -1
                ? "ATH"
                : coin.ath_change_percentage.toFixed(1) + "%"
              : "-"}
          </td>
        );
      default:
        return (
          <td>
            {coin.market_cap
              ? coin.market_cap.toString().length > 11
                ? (coin.market_cap / 1000000000).toFixed(3) + "G $"
                : (coin.market_cap / 1000000).toFixed(3) + "M $"
              : "-"}
          </td>
        );
    }
  };

  const smallRow = (
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
        <img src={coin.image} alt={`${coin.name} image`} />
      </td>
      <td className="pointer" onClick={() => navigate(`/coin/:${coin.id}`)}>
        {coin.name}
      </td>
      {dataColums()}
    </tr>
  );

  return smallRow;
};

export default SmallTableDataRow;
