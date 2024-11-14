import { useEffect, useState } from "react";
import { fullUserType } from "../Types/LandingTypes";
import { coinDataType } from "../Types/AppTypes";
import FavListItem from "./FavListItem";

type propsType = {
  user: fullUserType | undefined;
};

const Favorites = ({ user }: propsType) => {
  const [favoriteArray, setFavoriteArray] = useState<coinDataType[]>([]);

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
    if (user?.options?.favorites) {
      setFavoriteArray(user.options.favorites);
    }
  }, [user]);

  const FavList = (
    <div className="fav-container">
      {favoriteArray.length > 0 ? (
        <ul>
          {headerColums.map((li) => (
            <li>{li}</li>
          ))}
        </ul>
      ) : null}

      {favoriteArray.length > 0 ? (
        favoriteArray.map((coin) => <FavListItem coin={coin} key={coin.id} />)
      ) : (
        <p>You don't have any favorite coin.</p>
      )}
    </div>
  );
  return FavList;
};

export default Favorites;
