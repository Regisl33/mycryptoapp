//Import Dependencies
import { useEffect } from "react";
import { useNavigate } from "react-router";
//Import Custom Hooks and Functions
import { optionTD } from "../../Utils/TableUtilities";
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import DisplayValue and Favorite Switch Component
import DisplayOfValue from "../DisplayOfValue";
import FavoriteSwitch from "../SearchPage/FavoriteSwitch";
//Import Custom Type
import { coinDataType } from "../../Types/AppTypes";
//Props Type UserID, Temp Color, Current Coin Data and the Temp Fav Array State
type propsType = {
  coin: coinDataType;
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const IndividualSearchCoin = ({
  coin,
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  //Define Navigate
  const navigate = useNavigate();
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //This Function Displays the According Shadow
  const getShadow = (): string => {
    let classes = "";
    tempColor.length > 0
      ? tempColor[0] === "D"
        ? (classes = "Dshadow")
        : (classes = "Lshadow")
      : userData?.color[0] === "D"
      ? (classes = "Dshadow")
      : (classes = "Lshadow");

    return classes;
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //Structure of the Figure for the Logo
  const logoContainer = (
    <figure className="logo-container">
      <h2 className={getShadow()} onClick={() => navigate(`/coin/:${coin.id}`)}>
        {coin.name}
      </h2>
      <img src={coin.image} alt={coin.name + "image"} />
      <figcaption>
        {coin.symbol.toUpperCase()}{" "}
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_24h_in_currency}
        />
      </figcaption>
    </figure>
  );
  //Structure of the Table for the Coin Info
  const coinInfoTable = (
    <div className="coin-info-container">
      <table>
        <tbody>
          <tr>
            <th className={getShadow()}>Market Cap:</th>
            {optionTD("$", coin.market_cap)}
            <th className={getShadow()}>Market Cap Rank:</th>
            <td>{coin.market_cap_rank}</td>
          </tr>
          <tr>
            <th className={getShadow()}>Price:</th>
            <td>{coin.current_price.toLocaleString() + "$"}</td>
            <th className={getShadow()}>Volume:</th>
            {optionTD("$", coin.total_volume)}
          </tr>
          <tr>
            <th className={getShadow()}>Ath:</th>
            {optionTD("Date", coin.ath_change_percentage)}
            <th className={getShadow()}>Ath Date:</th>
            <td>{coin.ath_date.slice(0, 10)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  //Structure of a Single Search Élement
  const IndividualSearchCoinStructure = (
    <div
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "Dcoin-result"
            : "Lcoin-result"
          : userData?.color[0] === "D"
          ? "Dcoin-result"
          : "Lcoin-result"
      }
    >
      {logoContainer}
      <div className="search-container">
        <FavoriteSwitch
          currentID={currentID}
          tempFavArray={tempFavArray}
          setTempFavArray={setTempFavArray}
          coin={coin}
          getShadow={getShadow}
        />
        {coinInfoTable}
      </div>
    </div>
  );

  return IndividualSearchCoinStructure;
};

export default IndividualSearchCoin;
