import FavListItem from "./FavListItem";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { useEffect } from "react";
import { coinDataType, homeFav } from "../Types/AppTypes";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
};

const Favorites = ({ currentID, tempFavArray, tempColor }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
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
    if (tempFavArray.length > 0) {
      window.location.reload();
    }
  }, []);

  const FavList = (
    <div className="fav-container">
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
      {(userData && userData.favorites.length > 0) ||
      tempFavArray.length > 0 ? (
        <ul className="FavListHeader">
          {headerColums.map((fav) => (
            <li
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
        tempFavArray.map((coin, index) => (
          <FavListItem coin={coin} index={index} key={coin.id} />
        ))
      ) : userData && userData.favorites.length > 0 ? (
        userData.favorites.map((coin, index) => (
          <FavListItem coin={coin} index={index} key={coin.id} />
        ))
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
