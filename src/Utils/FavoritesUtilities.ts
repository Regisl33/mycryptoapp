import { favoriteMutationType } from "../Types/LandingTypes";

export const getNewFav = (arr: string[], id: number): favoriteMutationType => {
  let newFav: favoriteMutationType = {
    user: {
      favorites: arr,
    },
    id,
  };
  return newFav;
};
