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
        <DisplayOfValue valueType="$" value={coin.market_cap} />
      </td>
      <td>
        {coin.current_price ? coin.current_price.toLocaleString() + "$" : "-"}
      </td>
      <td>
        <DisplayOfValue valueType="$" value={coin.total_volume} />
      </td>
      <td>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_1h_in_currency}
        />
      </td>
      <td>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_24h_in_currency}
        />
      </td>
      <td>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_7d_in_currency}
        />
      </td>
      <td>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_14d_in_currency}
        />
      </td>
      <td>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_30d_in_currency}
        />
      </td>
      <td>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_200d_in_currency}
        />
      </td>
      <td>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_1y_in_currency}
        />
      </td>
      <td>
        <DisplayOfValue valueType="Date" value={coin.ath_change_percentage} />
      </td>
    </tr>
  );
};

export default TableDataRow;
