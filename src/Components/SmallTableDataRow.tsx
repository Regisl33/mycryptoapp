import React from "react";
import { coinDataType } from "../Types/AppTypes";
import StarFavorite from "./StarFavorite";
import { useNavigate } from "react-router";
import DisplayOfValue from "./DisplayOfValue";

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
            <DisplayOfValue valueType="$" value={coin.market_cap} />
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
            <DisplayOfValue valueType="$" value={coin.total_volume} />
          </td>
        );
      case "1h":
        return (
          <td>
            <DisplayOfValue
              valueType="%"
              value={coin.price_change_percentage_1h_in_currency}
            />
          </td>
        );
      case "1j":
        return (
          <td>
            <DisplayOfValue
              valueType="%"
              value={coin.price_change_percentage_24h_in_currency}
            />
          </td>
        );
      case "7j":
        return (
          <td>
            <DisplayOfValue
              valueType="%"
              value={coin.price_change_percentage_7d_in_currency}
            />
          </td>
        );
      case "14j":
        return (
          <td>
            <DisplayOfValue
              valueType="%"
              value={coin.price_change_percentage_14d_in_currency}
            />
          </td>
        );
      case "30j":
        return (
          <td>
            <DisplayOfValue
              valueType="%"
              value={coin.price_change_percentage_30d_in_currency}
            />
          </td>
        );
      case "200j":
        return (
          <td>
            <DisplayOfValue
              valueType="%"
              value={coin.price_change_percentage_200d_in_currency}
            />
          </td>
        );
      case "1y":
        return (
          <td>
            <DisplayOfValue
              valueType="%"
              value={coin.price_change_percentage_1y_in_currency}
            />
          </td>
        );
      case "Ath":
        return (
          <td>
            <DisplayOfValue valueType="Date" value={coin.ath} />
          </td>
        );
      default:
        return (
          <td>
            <DisplayOfValue valueType="$" value={coin.market_cap} />
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
