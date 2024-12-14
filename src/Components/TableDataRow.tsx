//Import Dependencies
import { useNavigate } from "react-router";
//Import Components for the Favorite Star Button and The Display Value Components
import StarFavorite from "./StarFavorite";
import { optionTD } from "../Utils/TableUtilities";
//Import Types
import { IDCoinTempFavArrPropsType } from "../Types/AppTypes";

const TableDataRow = ({
  coin,
  currentID,
  tempFavArray,
  setTempFavArray,
}: IDCoinTempFavArrPropsType) => {
  //Define Navigate
  const navigate = useNavigate();
  //Full Row of the Table, Every Value from the table is passed through optionTD Function
  const fullRowReturn = (
    <tr>
      <td>{coin.market_cap_rank}</td>
      {/* Star Favorite Component that Allows you to Manage your Favorite From the Table */}
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
      {optionTD("$", coin.market_cap)}
      <td>
        {coin.current_price ? coin.current_price.toLocaleString() + "$" : "-"}
      </td>
      {optionTD("$", coin.total_volume)}
      {optionTD("%", coin.price_change_percentage_1h_in_currency)}
      {optionTD("%", coin.price_change_percentage_24h_in_currency)}
      {optionTD("%", coin.price_change_percentage_7d_in_currency)}
      {optionTD("%", coin.price_change_percentage_14d_in_currency)}
      {optionTD("%", coin.price_change_percentage_30d_in_currency)}
      {optionTD("%", coin.price_change_percentage_200d_in_currency)}
      {optionTD("%", coin.price_change_percentage_1y_in_currency)}
      {optionTD("Date", coin.ath)}
    </tr>
  );

  return fullRowReturn;
};

export default TableDataRow;
