//Import Dependencies
import { useEffect, useState } from "react";
//Import Custom Hook and Function
import {
  useGetCurrentUserQuery,
  useFavoriteMutation,
} from "../../Features/LandingPage/UserSlice";
import { getCurrentUserFavorite } from "../../Features/CoinGeeckoData/CoinDataSlice";
import { getNewFav } from "../../Utils/FavoritesUtilities";
//Import Custom Types useSelector
import { useAppSelector } from "../../Store/Store";
//Import Icon
import { TiDeleteOutline } from "react-icons/ti";
//Import Custom Types
import { coinDataType } from "../../Types/AppTypes";
import { favoriteMutationType } from "../../Types/LandingTypes";
import { IDColorTempFavArrPropsType } from "../../Types/AppTypes";

const ParamFavorite = ({
  currentID,
  tempColor,
  tempFavArray,
  setTempFavArray,
}: IDColorTempFavArrPropsType) => {
  //Favorite Array State
  const [favoriteArray, setFavoriteArray] = useState<coinDataType[]>([]);
  //Define Favorite Mutation
  const [favoriteMutation] = useFavoriteMutation();
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Get Coin Data
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  //This Function Handle the Update of Favorite in the User API
  const updateFavDB = (value: favoriteMutationType) => {
    try {
      favoriteMutation(value).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
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
  //This Function Creates the Data and Post it in the User API using UpdateFavDB  and getNewFav Function
  const updateUserFav = (arr: string[]) => {
    let newFav = getNewFav(arr, currentID);
    updateFavDB(newFav);
  };
  //This Function Handle the Whole Fav Delete Process, (tempFavArray and DB)
  const handleUpdateFav = (arr1: string[], arr2: coinDataType[]) => {
    updateUserFav(arr1);
    setTempFavArray(arr2);
  };
  //This Function Handle the Deletion of a Favorite Using handleUpdateFav
  const handleDeleteFavorite = (favID: string) => {
    if (tempFavArray.length > 0) {
      let favArray = tempFavArray.filter((fav) => fav.id !== favID);
      let newArray: string[] = [];
      favArray.map((coin) => newArray.push(coin.id));
      handleUpdateFav(newArray, favArray);
    } else if (userData?.favorites && userData?.favorites.length > 0) {
      let favArray = userData.favorites.filter((fav) => fav !== favID);
      let newArray = getCurrentUserFavorite(favArray, coinData);
      handleUpdateFav(favArray, newArray);
    }
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //This useEffect Fetch the Current User Favorites
  useEffect(() => {
    if (userData?.favorites && userData.favorites.length > 0) {
      let newArray = getCurrentUserFavorite(userData.favorites, coinData);
      setFavoriteArray(newArray);
    }
  }, [userData, coinData]);
  //HTML Structure of the Manage Favorite Section in the Parameters
  const manageFavDisplay = (
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

  return manageFavDisplay;
};

export default ParamFavorite;
