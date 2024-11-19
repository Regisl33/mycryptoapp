import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import Favorites from "./Favorites";
import Footer from "./Footer";
import Header from "./Header";
import TodayRecap from "./TodayRecap";

type propsType = {
  currentID: number;
  tempColor: string;
};

const Home = ({ currentID, tempColor }: propsType) => {
  const {
    data: userData,
    isError,
    error,
  } = useGetCurrentUserQuery(currentID as number);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, []);

  return (
    <main
      className={
        tempColor.length > 0 && tempColor !== userData?.options.color
          ? tempColor
          : userData?.options.color
      }
    >
      <Header />
      <div className="main-container">
        <Favorites />
        <TodayRecap />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
