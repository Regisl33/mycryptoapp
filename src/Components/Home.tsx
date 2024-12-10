import Favorites from "./Favorites";
import TodayRecap from "./TodayRecap";
import { coinDataType } from "../Types/AppTypes";

type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
};

const Home = ({ currentID, tempColor, tempFavArray }: propsType) => {
  const homeContainer = (
    <div className="main-container">
      <Favorites
        currentID={currentID}
        tempFavArray={tempFavArray}
        tempColor={tempColor}
      />
      <TodayRecap tempColor={tempColor} currentID={currentID} />
    </div>
  );

  return homeContainer;
};

export default Home;
