import React, { useEffect } from "react";
import { FaRegStar } from "react-icons/fa6";
import {
  useFavoriteMutation,
  useGetCurrentUserQuery,
} from "../Features/LandingPage/UserSlice";
import { favoriteMutationType } from "../Types/LandingTypes";
import { coinDataType } from "../Types/AppTypes";

type propsType = {
  currentID: number;
  coin: coinDataType;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const StarFavorite = ({
  coin,
  currentID,
  tempFavArray,
  setTempFavArray,
}: propsType) => {
  const [favoriteMutation] = useFavoriteMutation();
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  const handleAddDelete = (unique: boolean, favArray: coinDataType[]) => {
    if (userData) {
      if (unique) {
        let newFav: favoriteMutationType = {
          user: {
            favorites: [coin, ...favArray],
          },
          id: userData.id,
        };
        try {
          setTempFavArray([coin, ...favArray]);
          favoriteMutation(newFav).unwrap();
        } catch (err) {
          console.log(err);
        }
      } else {
        let newArray = favArray.filter((fav) => fav.id !== coin.id);
        let newFav: favoriteMutationType = {
          user: {
            favorites: newArray,
          },
          id: userData.id,
        };
        try {
          setTempFavArray(newArray);
          favoriteMutation(newFav).unwrap();
        } catch (err) {
          console.log(err);
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
        favoriteArray.map((fav) =>
          fav.id === coin.id ? (isUnique = false) : null
        );
        handleAddDelete(isUnique, favoriteArray);
      } else if (userData.favorites.length > 0) {
        let favoriteArray = [...userData.favorites];
        let isUnique = true;
        favoriteArray.map((fav) =>
          fav.id === coin.id ? (isUnique = false) : null
        );
        handleAddDelete(isUnique, favoriteArray);
      } else {
        let newFav: favoriteMutationType = {
          user: {
            favorites: [coin],
          },
          id: userData.id,
        };
        try {
          setTempFavArray([coin]);
          favoriteMutation(newFav).unwrap();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("Error no userData");
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, []);
  return (
    <td>
      <FaRegStar onClick={() => handleFavorite()} />
    </td>
  );
};

export default StarFavorite;
