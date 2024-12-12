import { useFavoriteMutation } from "../Features/LandingPage/UserSlice";
import { favoriteMutationType } from "../Types/LandingTypes";
const [favoriteMutation] = useFavoriteMutation();

export const updateFavDB = (value: favoriteMutationType) => {
  try {
    favoriteMutation(value).unwrap();
  } catch (err) {
    console.log(err);
  }
};

export const getNewFav = (arr: string[], id: number): favoriteMutationType => {
  let newFav: favoriteMutationType = {
    user: {
      favorites: arr,
    },
    id,
  };
  return newFav;
};
