import FavListItem from "./FavListItem";
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
import { useEffect, useState } from "react";
import { coinDataType, homeFav } from "../../Types/AppTypes";
import { getCurrentUserFavorite } from "../../Features/CoinGeeckoData/CoinDataSlice";
import { useAppSelector } from "../../Store/Store";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
};

const Favorites = ({ currentID, tempFavArray, tempColor }: propsType) => {
  const [favoriteArray, setFavoriteArray] = useState<coinDataType[]>([]);
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
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

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (userData?.favorites && userData?.favorites.length > 0) {
      let favArray = getCurrentUserFavorite(userData.favorites, coinData);
      setFavoriteArray(favArray);
    }
  }, [userData, coinData]);

  const FavList = (
    <div className="fav-home-container">
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

      {tempFavArray.length > 0 ? (
        tempFavArray.map((coin) => <FavListItem coin={coin} key={coin.id} />)
      ) : userData?.favorites && userData.favorites.length > 0 ? (
        favoriteArray.map((coin) => <FavListItem coin={coin} key={coin.id} />)
      ) : (
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
      )}
    </div>
  );
  return FavList;
};

export default Favorites;
