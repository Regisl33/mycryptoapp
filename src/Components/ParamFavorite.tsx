import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import {
  useFavoriteMutation,
  useGetCurrentUserQuery,
} from "../Features/LandingPage/UserSlice";
import { coinDataType } from "../Types/AppTypes";
import { favoriteMutationType } from "../Types/LandingTypes";

type propsType = {
  currentID: number;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const ParamFavorite = ({
  currentID,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const [isModified, setIsModified] = useState(false);
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  const [favoriteMutation] = useFavoriteMutation();

  const updateUserFav = (arr: coinDataType[]) => {
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
    if (isModified) {
      let favArray = tempFavArray.filter((fav) => fav.id !== favID);
      setTempFavArray(favArray);
      updateUserFav(favArray);
    } else if (userData) {
      let favArray = userData.favorites.filter((fav) => fav.id !== favID);
      setIsModified(true);
      setTempFavArray(favArray);
      updateUserFav(favArray);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (tempFavArray.length > 0) {
      window.location.reload();
    }
  }, []);

  return (
    <div className="favorite-list-container">
      <h2 className="title">Manage Your Favorites</h2>
      <ul>
        {isModified ? (
          tempFavArray.length > 0 ? (
            tempFavArray.map((fav) => (
              <li>
                <>
                  {fav.name}{" "}
                  <TiDeleteOutline
                    onClick={() => handleDeleteFavorite(fav.id)}
                  />
                </>
              </li>
            ))
          ) : (
            <p> You don't have any favorite coin</p>
          )
        ) : userData?.favorites ? (
          userData.favorites.map((fav) => (
            <li>
              <>
                {fav.name}{" "}
                <TiDeleteOutline onClick={() => handleDeleteFavorite(fav.id)} />
              </>
            </li>
          ))
        ) : (
          <p> You don't have any favorite coin</p>
        )}
      </ul>
    </div>
  );
};

export default ParamFavorite;
