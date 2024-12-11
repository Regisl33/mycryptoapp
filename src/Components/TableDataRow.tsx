import React from "react";
import { coinDataType } from "../Types/AppTypes";
import StarFavorite from "./StarFavorite";
import { useNavigate } from "react-router";
import MarketCap from "./Values/MarketCap";
import Volume from "./Values/Volume";
import Hours from "./Values/Hours";
import Day from "./Values/Day";
import Week from "./Values/Week";
import Week2 from "./Values/Week2";
import Months from "./Values/Months";
import Months6 from "./Values/Months6";
import Year from "./Values/Year";
import Ath from "./Values/Ath";

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
        <MarketCap coin={coin} />
      </td>
      <td>
        {coin.current_price ? coin.current_price.toLocaleString() + "$" : "-"}
      </td>
      <td>
        <Volume coin={coin} />
      </td>
      <td>
        <Hours coin={coin} />
      </td>
      <td>
        <Day coin={coin} />
      </td>
      <td>
        <Week coin={coin} />
      </td>
      <td>
        <Week2 coin={coin} />
      </td>
      <td>
        <Months coin={coin} />
      </td>
      <td>
        <Months6 coin={coin} />
      </td>
      <td>
        <Year coin={coin} />
      </td>
      <td>
        <Ath coin={coin} />
      </td>
    </tr>
  );
};

export default TableDataRow;
