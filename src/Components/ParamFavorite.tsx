import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { coinDataType } from "../Types/AppTypes";
import { getCurrentUserFavorite } from "../Features/CoinGeeckoData/CoinDataSlice";
import { useAppSelector } from "../Store/Store";
import { getNewFav } from "../Utils/FavoritesUtilities";
import { useFavoriteMutation } from "../Features/LandingPage/UserSlice";
import { favoriteMutationType } from "../Types/LandingTypes";

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
  const [favoriteArray, setFavoriteArray] = useState<coinDataType[]>([]);
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const [favoriteMutation] = useFavoriteMutation();
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );

  const updateFavDB = (value: favoriteMutationType) => {
    try {
      favoriteMutation(value).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

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

  const updateUserFav = (arr: string[]) => {
    let newFav = getNewFav(arr, currentID);
    updateFavDB(newFav);
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
  }, [userData, coinData]);

  return (
    <div className="favorite-list-container">
      <h2 className={getShadow()}>Manage Your Favorites</h2>
      <ul className="param-fav">
        {tempFavArray.length > 0 ? (
          tempFavArray.map((fav) => (
            <li key={fav.name}>
              <p>{fav.name}</p>
              <TiDeleteOutline onClick={() => handleDeleteFavorite(fav.id)} />
            </li>
          ))
        ) : userData?.favorites && userData?.favorites.length > 0 ? (
          favoriteArray.map((fav) => (
            <li key={fav.name}>
              <p>{fav.name}</p>
              <TiDeleteOutline onClick={() => handleDeleteFavorite(fav.id)} />
            </li>
          ))
        ) : (
          <p className={getShadow()}>You don't have any favorite coin</p>
        )}
      </ul>
    </div>
  );
};

export default ParamFavorite;
