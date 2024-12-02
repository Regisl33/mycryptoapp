import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import {
  useFavoriteMutation,
  useGetCurrentUserQuery,
} from "../Features/LandingPage/UserSlice";
import { coinDataType } from "../Types/AppTypes";
import { favoriteMutationType } from "../Types/LandingTypes";
import { getCurrentUserFavorite } from "../Features/CoinGeeckoData/CoinDataSlice";
import { useAppSelector } from "../Store/Store";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const ParamFavorite = ({
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const [isModified, setIsModified] = useState(false);
  const [favoriteArray, setFavoriteArray] = useState<coinDataType[]>([]);
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const [favoriteMutation] = useFavoriteMutation();
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );

  const updateUserFav = (arr: string[]) => {
    let newFav: favoriteMutationType = {
      user: {
        favorites: arr,
      },
      id: currentID,
    };
    try {
      favoriteMutation(newFav).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFavorite = (favID: string) => {
    if (tempFavArray.length > 0) {
      let favArray = tempFavArray.filter((fav) => fav.id !== favID);
      setTempFavArray(favArray);
      let newArray: string[] = [];
      favArray.map((coin) => newArray.push(coin.id));
      updateUserFav(newArray);
    } else if (userData?.favorites && userData?.favorites.length > 0) {
      let favArray = userData.favorites.filter((fav) => fav !== favID);
      setIsModified(true);
      let newArray = getCurrentUserFavorite(favArray, coinData);
      setTempFavArray(newArray);
      updateUserFav(favArray);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (userData?.favorites && userData.favorites.length > 0) {
      let newArray = getCurrentUserFavorite(userData.favorites, coinData);
      setFavoriteArray(newArray);
    }
  }, [userData]);

  return (
    <div className="favorite-list-container">
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
        Manage Your Favorites
      </h2>
      <ul className="param-fav">
        {tempFavArray.length > 0 ? (
          tempFavArray.map((fav) => (
            <li key={fav.name}>
              <>
                {fav.name}
                <TiDeleteOutline onClick={() => handleDeleteFavorite(fav.id)} />
              </>
            </li>
          ))
        ) : userData?.favorites && userData?.favorites.length > 0 ? (
          favoriteArray.map((fav) => (
            <>
              <li>{fav.name}</li>
              <TiDeleteOutline onClick={() => handleDeleteFavorite(fav.id)} />
            </>
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
            You don't have any favorite coin
          </p>
        )}
      </ul>
    </div>
  );
};

export default ParamFavorite;
