import FavListItem from "./FavListItem";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { useEffect } from "react";
import { coinDataType } from "../Types/AppTypes";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
};

const Favorites = ({ currentID, tempFavArray, tempColor }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const headerColums: string[] = [
    "Symbol",
    "Name",
    "Price",
    "Market Cap",
    "Rank",
    "1H",
    "24H",
    "7D",
    "30D",
    "1Y",
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
          {headerColums.map((li) => (
            <li>{li}</li>
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
