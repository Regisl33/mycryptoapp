import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../Features/LandingPage/UserSlice";
import { currentIDPropsType } from "../Types/LandingTypes";
import Favorites from "./Favorites";
import Footer from "./Footer";
import Header from "./Header";
import TodayRecap from "./TodayRecap";
import { fullUserType } from "../Types/LandingTypes";
import { useAppDispatch } from "../Store/Store";
import { fetchGlobalData } from "../Features/CoinGeeckoData/CoinDataSlice";

const Home = ({ currentID }: currentIDPropsType) => {
  const [currentUser, setCurrentUser] = useState<fullUserType>();
  const { data: userApiData, isError, error } = useGetAllUsersQuery("User");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGlobalData());
    if (!isError) {
      if (userApiData?.ids) {
        userApiData.ids.map((id) =>
          id === currentID
            ? setCurrentUser(userApiData.entities[id])
            : console.log(id)
        );
      } else {
        console.log("There is no data in the user Array");
      }
    } else {
      console.log(error);
    }
  }, []);

  return (
    <main
      className={
        currentUser?.options?.color ? currentUser.options.color : "Lcolor1"
      }
    >
      <Header user={currentUser} />
      <Favorites user={currentUser} />
      <TodayRecap />
      <Footer />
    </main>
  );
};

export default Home;
