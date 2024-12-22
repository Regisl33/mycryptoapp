//Import Dependencies
import { useNavigate } from "react-router";
//Import Components for the Favorite Star Button and The Display Value Components
import StarFavorite from "./StarFavorite";
import { optionTD } from "../../Utils/TableUtilities";
//Import Types
import { coinDataType } from "../../Types/AppTypes";
//Props Type for UserID, the Current Coin, and the tempFavArray State and the Current Data to Display in the Select
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
  //Define Navigate
  const navigate = useNavigate();

  //This Function Return the Result of a Switch on the displayData Props to Display the Appropriate Data Using the optionTD Function
  const dataColums = (): JSX.Element => {
    switch (displayData) {
      case "Market Cap":
        return optionTD("$", coin.market_cap);
      case "Price":
        return (
          <td>
            {coin.current_price
              ? coin.current_price.toLocaleString() + "$"
              : "-"}
          </td>
        );
      case "Volume":
        return optionTD("$", coin.total_volume);
      case "1h":
        return optionTD("%", coin.price_change_percentage_1h_in_currency);
      case "1j":
        return optionTD("%", coin.price_change_percentage_24h_in_currency);
      case "7j":
        return optionTD("%", coin.price_change_percentage_7d_in_currency);

      case "14j":
        return optionTD("%", coin.price_change_percentage_14d_in_currency);
      case "30j":
        return optionTD("%", coin.price_change_percentage_30d_in_currency);
      case "200j":
        return optionTD("%", coin.price_change_percentage_200d_in_currency);
      case "1y":
        return optionTD("%", coin.price_change_percentage_1y_in_currency);
      case "Ath":
        return optionTD("Date", coin.ath_change_percentage);
      default:
        return optionTD("$", coin.market_cap);
    }
  };
  //Small Table Row's Structure
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
        <img src={coin.image} alt={coin.name} />
      </td>
      {/* This Allows you to Click on the Name and get to the Individual Coin Page with Navigate */}
      <td className="pointer" onClick={() => navigate(`/coin/:${coin.id}`)}>
        {coin.name}
      </td>
      {dataColums()}
    </tr>
  );

  return smallRow;
};

export default SmallTableDataRow;
