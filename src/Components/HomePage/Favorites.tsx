//Import Dependencies
import { useEffect, useState } from "react";
//Import Custom Hook and Functions
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
import { getCurrentUserFavorite } from "../../Features/CoinGeeckoData/CoinDataSlice";
//Import Custom Types useSelector
import { useAppSelector } from "../../Store/Store";
//Import FavListItem Component
import FavListItem from "./FavListItem";
//Import Custom Type
import { coinDataType, homeFav } from "../../Types/AppTypes";
//Props Type for UserID, Temp Color and Temp Fav Array
type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
};

const Favorites = ({ currentID, tempFavArray, tempColor }: propsType) => {
  //Define Favorite Array State
  const [favoriteArray, setFavoriteArray] = useState<coinDataType[]>([]);
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Get Coin Data
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  //Define the Header of the Table
  const headerColums: homeFav[] = [
    { fav: "Symbol", class: "" },
    { fav: "Name", class: "bigscreen" },
    { fav: "Price", class: "" },
    { fav: "Market Cap", class: "bigscreen" },
    { fav: "Rank", class: "" },
    { fav: "1H", class: "" },
    { fav: "24H", class: "" },
    { fav: "7D", class: "bigscreen" },
    { fav: "30D", class: "bigscreen" },
    { fav: "1Y", class: "bigscreen" },
  ];
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);
  //This useEffect Gets the Favorite From the User and Sets the Favorite Array State
  useEffect(() => {
    if (userData?.favorites && userData?.favorites.length > 0) {
      let favArray = getCurrentUserFavorite(userData.favorites, coinData);
      setFavoriteArray(favArray);
    }
  }, [userData, coinData]);
  //Title for the Table Favorite
  const FavoriteTitle = (
    <h2
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "title Dshadow"
            : "title Lshadow"
          : userData?.color[0] === "D"
          ? "title Dshadow"
          : "title Lshadow"
      }
    >
      Favorites Cryptocurrency
    </h2>
  );
  //Text Displayed if you don't have Favorites
  const errorText = (
    <p
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "Dshadow"
            : "Lshadow"
          : userData?.color[0] === "D"
          ? "Dshadow"
          : "Lshadow"
      }
    >
      You don't have any favorite coin.
    </p>
  );
  //Full Favorite Component Structure
  const FavList = (
    <div className="fav-home-container">
      {FavoriteTitle}
      {(userData?.favorites && userData.favorites.length > 0) ||
      tempFavArray.length > 0 ? (
        <ul className="FavListHeader">
          {headerColums.map((fav) => (
            <li
              key={fav.fav}
              className={
                tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? `Dshadow ${fav.class}`
                    : `Lshadow ${fav.class}`
                  : userData?.color[0] === "D"
                  ? `Dshadow ${fav.class}`
                  : `Lshadow ${fav.class}`
              }
            >
              {fav.fav}
            </li>
          ))}
        </ul>
      ) : null}

      {tempFavArray.length > 0
        ? tempFavArray.map((coin) => <FavListItem coin={coin} key={coin.id} />)
        : userData?.favorites && userData.favorites.length > 0
        ? favoriteArray.map((coin) => <FavListItem coin={coin} key={coin.id} />)
        : errorText}
    </div>
  );
  return FavList;
};

export default Favorites;
