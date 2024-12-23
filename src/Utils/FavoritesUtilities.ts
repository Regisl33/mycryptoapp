//Import Custom Type
import { favoriteMutationType } from "../Types/LandingTypes";
//This Function Build the Favorite Mutation Object
export const getNewFav = (arr: string[], id: string): favoriteMutationType => {
  let newFav: favoriteMutationType = {
    user: {
      favorites: arr,
    },
    id,
  };
  return newFav;
};
