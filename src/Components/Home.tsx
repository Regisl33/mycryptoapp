import Favorites from "./Favorites";
import Footer from "./Footer";
import Header from "./Header";
import TodayRecap from "./TodayRecap";

const Home = () => {
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
