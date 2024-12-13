import { useEffect, useState, useCallback } from "react";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { getCurrentUserFavorite } from "../Features/CoinGeeckoData/CoinDataSlice";
import { useAppSelector } from "../Store/Store";
import { coinDataType } from "../Types/AppTypes";
import { getNewFav } from "../Utils/FavoritesUtilities";
import { useFavoriteMutation } from "../Features/LandingPage/UserSlice";
import { favoriteMutationType } from "../Types/LandingTypes";

type propsType = {
  currentID: number;
  coin: coinDataType;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
  getShadow: () => string;
};

const FavoriteSwitch = ({
  currentID,
  coin,
  tempFavArray,
  setTempFavArray,
  getShadow,
}: propsType) => {
  const [isFavorite, setIsFavorite] = useState(false);
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

  const handleAddDelete = (unique: boolean, favArray: string[]) => {
    if (userData) {
      if (unique) {
        let newFavArray = [coin.id, ...favArray];
        let newFav = getNewFav(newFavArray, userData.id);
        updateFavDB(newFav);
        let newArray = getCurrentUserFavorite(favArray, coinData);
        setTempFavArray([coin, ...newArray]);
      } else {
        let newFavArray = favArray.filter((fav) => fav !== coin.id);
        let newFav = getNewFav(newFavArray, userData.id);
        updateFavDB(newFav);
        let newArray = getCurrentUserFavorite(newFavArray, coinData);
        if (newArray.length > 0) {
          setTempFavArray(newArray);
        } else {
          window.location.reload();
        }
      }
    } else {
      console.log("Error no userData");
    }
  };

  const handleFavorite = () => {
    if (userData) {
      if (tempFavArray.length > 0) {
        let favoriteArray = [...tempFavArray];
        let isUnique = true;
        let favoriteID: string[] = [];
        favoriteArray.map((fav) => favoriteID.push(fav.id));
        favoriteArray.map((fav) =>
          fav.id === coin.id ? (isUnique = false) : null
        );
        handleAddDelete(isUnique, favoriteID);
      } else if (userData.favorites && userData.favorites.length > 0) {
        let favoriteArray = [...userData.favorites];
        let isUnique = true;
        favoriteArray.map((fav) =>
          fav === coin.id ? (isUnique = false) : null
        );
        handleAddDelete(isUnique, favoriteArray);
      } else {
        let newFavArray = [coin.id];
        let newFav = getNewFav(newFavArray, userData.id);
        updateFavDB(newFav);
        setTempFavArray([coin]);
      }
    } else {
      console.log("Error no userData");
    }
  };

  const handleFavChange = () => {
    setIsFavorite(!isFavorite);
    handleFavorite();
  };

  const handleFavoriteDisplay = useCallback(() => {
    let isFav = false;
    if (tempFavArray.length > 0) {
      tempFavArray.map((fav) => (fav.id === coin.id ? (isFav = true) : null));
    } else if (userData?.favorites && userData.favorites.length > 0) {
      userData.favorites.map((fav) =>
        fav === coin.id ? (isFav = true) : null
      );
    }
    setIsFavorite(isFav);
  }, [userData, tempFavArray, coin]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    handleFavoriteDisplay();
  }, [handleFavoriteDisplay]);

  return (
    <div className="fav-container">
      {isFavorite ? (
        <label htmlFor="Fav-Input" className={getShadow()}>
          Remove From Favorite
        </label>
      ) : (
        <label htmlFor="Fav-Input" className={getShadow()}>
          Add To Favorite
        </label>
      )}
      <div className="checkbox-wrapper-50">
        <input
          type="checkbox"
          className="plus-minus"
          id="Fav-Input"
          checked={isFavorite}
          onClick={() => handleFavChange()}
        />
      </div>
    </div>
  );
};

export default FavoriteSwitch;
