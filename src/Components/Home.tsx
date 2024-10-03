import Favorites from "./Favorites";
import Footer from "./Footer";
import Header from "./Header";
import TodayRecap from "./TodayRecap";

type propsType = {
  userID: number;
};

const Home = ({ userID }: propsType) => {
  return (
    <main>
      <Header />
      <Favorites />
      <TodayRecap />
      <Footer />
    </main>
  );
};

export default Home;
