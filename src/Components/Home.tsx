import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import Favorites from "./Favorites";
import Footer from "./Footer";
import Header from "./Header";
import TodayRecap from "./TodayRecap";
import { coinDataType } from "../Types/AppTypes";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
};

const Home = ({ currentID, tempColor, tempFavArray }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, []);

  return (
    <main
      className={
        tempColor.length > 0 && tempColor !== userData?.color
          ? tempColor
          : userData?.color
      }
    >
      <Header currentID={currentID} tempColor={tempColor} />
      <div className="main-container">
        <Favorites
          currentID={currentID}
          tempFavArray={tempFavArray}
          tempColor={tempColor}
        />
        <TodayRecap tempColor={tempColor} currentID={currentID} />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
