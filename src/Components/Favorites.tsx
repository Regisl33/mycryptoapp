import FavListItem from "./FavListItem";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { useEffect } from "react";
import { coinDataType } from "../Types/AppTypes";

type propsType = {
  currentID: number;
  tempFavArray: coinDataType[];
};

const Favorites = ({ currentID, tempFavArray }: propsType) => {
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
      {(userData && userData.favorites.length > 0) ||
      tempFavArray.length > 0 ? (
        <ul>
          {headerColums.map((li) => (
            <li>{li}</li>
          ))}
        </ul>
      ) : null}

      {tempFavArray.length > 0 ? (
        tempFavArray.map((coin) => <FavListItem coin={coin} key={coin.id} />)
      ) : userData && userData.favorites.length > 0 ? (
        userData.favorites.map((coin) => (
          <FavListItem coin={coin} key={coin.id} />
        ))
      ) : (
        <p>You don't have any favorite coin.</p>
      )}
    </div>
  );
  return FavList;
};

export default Favorites;
