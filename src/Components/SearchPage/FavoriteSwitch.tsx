//Import Dependencies
import { useEffect, useState, useCallback } from "react";
//Import Custom Hooks and Functions
import {
  useGetCurrentUserQuery,
  useFavoriteMutation,
} from "../../Features/LandingPage/UserSlice";
import { getCurrentUserFavorite } from "../../Features/CoinGeeckoData/CoinDataSlice";
import { getNewFav } from "../../Utils/FavoritesUtilities";
//Import Custom Types useSelector
import { useAppSelector } from "../../Store/Store";
//Import Custom Type
import { coinDataType } from "../../Types/AppTypes";
import { favoriteMutationType } from "../../Types/LandingTypes";
//Props Type for UserID, Current Coin Data, the Temp Fav Array State and the Get Shadow Function
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
  //Define the isFavorite State
  const [isFavorite, setIsFavorite] = useState(false);
  //Define Favorite
  const [favoriteMutation] = useFavoriteMutation();
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Get Coin Data
  const coinData: coinDataType[] = useAppSelector(
    (state) => state.coinData.data
  );
  //This Function Receives a Value and Update the User Api via FavoriteMutation
  const updateFavDB = (value: favoriteMutationType) => {
    try {
      favoriteMutation(value).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  //This Function Receives a Unique (Boolean) Value and the Favorite ID Array From the User
  const handleAddDelete = (unique: boolean, favArray: string[]) => {
    //Test if the Unique Value is True, if so it adds the cCurrent Coin to the User's Favorites
    if (unique && userData) {
      let newFavArray = [coin.id, ...favArray];
      let newFav = getNewFav(newFavArray, userData.id);
      updateFavDB(newFav);
      let newArray = getCurrentUserFavorite(favArray, coinData);
      setTempFavArray([coin, ...newArray]);
      //If Unique is False, it Removes the Current Coin From the User's Favorites
    } else if (userData) {
      let newFavArray = favArray.filter((fav) => fav !== coin.id);
      let newFav = getNewFav(newFavArray, userData.id);
      updateFavDB(newFav);
      let newArray = getCurrentUserFavorite(newFavArray, coinData);
      //This Test if we Removed the last Favorite Coin for the User and if so it Reloads the Page to Update the Page from the User Api (It Prevents a bug Where the Last Favorite Would Still Show up Even if Deleted)
      if (newArray.length > 0) {
        setTempFavArray(newArray);
      } else {
        window.location.reload();
      }
    }
  };
  //This Function is Called when the Icon is Clicked, it Calls handleAddDelete and prepares the Info for it
  const handleFavorite = () => {
    if (tempFavArray.length > 0 && userData) {
      //Defines Favorite Array as the tempFavArray, isUnique to True and the Empty Array Variable for the favoriteID
      let favoriteArray = [...tempFavArray];
      let isUnique = true;
      let favoriteID: string[] = [];
      //Map the favoriteArray to Create an Array with Only their ID, then Checks if the Actual Coin is Part of That Array and set is Unique Variable Accordingly
      favoriteArray.map((fav) => favoriteID.push(fav.id));
      favoriteArray.map((fav) =>
        fav.id === coin.id ? (isUnique = false) : null
      );
      //Calls handleAddDelete With the isUnique and favoriteID Array set Accordingly
      handleAddDelete(isUnique, favoriteID);
    } else if (
      userData &&
      userData.favorites &&
      userData.favorites.length > 0
    ) {
      //Defines Favorite Array as the Current User Api Favorite and isUnique to True
      let favoriteArray = [...userData.favorites];
      let isUnique = true;
      //Checks if the Actual Coin is Part of our Array and set is Unique Variable Accordingly
      favoriteArray.map((fav) => (fav === coin.id ? (isUnique = false) : null));
      //Calls handleAddDelete With the isUnique and favoriteID Array set Accordingly
      handleAddDelete(isUnique, favoriteArray);
      //This case only Happens if the User had no Favorite Coin, then it adds the First Coin.
    } else if (userData) {
      let newFavArray = [coin.id];
      let newFav = getNewFav(newFavArray, userData.id);
      updateFavDB(newFav);
      setTempFavArray([coin]);
    }
  };
  //This Function Handle the Change of Favorite
  const handleFavChange = () => {
    setIsFavorite(!isFavorite);
    handleFavorite();
  };
  //This Function Display the Checkbox Based on the isFavorite State
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
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //This useEffect Displays the Correct Checkbox Status using HandleFavoriteDisplay
  useEffect(() => {
    handleFavoriteDisplay();
  }, [handleFavoriteDisplay]);

  const FavoriteSwitchContent = (
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

  return FavoriteSwitchContent;
};

export default FavoriteSwitch;
