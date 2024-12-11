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
            <MarketCap coin={coin} />
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
            <Volume coin={coin} />
          </td>
        );
      case "1h":
        return (
          <td>
            <Hours coin={coin} />
          </td>
        );
      case "1j":
        return (
          <td>
            <Day coin={coin} />{" "}
          </td>
        );
      case "7j":
        return (
          <td>
            <Week coin={coin} />
          </td>
        );
      case "14j":
        return (
          <td>
            <Week2 coin={coin} />
          </td>
        );
      case "30j":
        return (
          <td>
            <Months coin={coin} />
          </td>
        );
      case "200j":
        return (
          <td>
            <Months6 coin={coin} />
          </td>
        );
      case "1y":
        return (
          <td>
            <Year coin={coin} />
          </td>
        );
      case "Ath":
        return (
          <td>
            <Ath coin={coin} />
          </td>
        );
      default:
        return (
          <td>
            <MarketCap coin={coin} />
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
