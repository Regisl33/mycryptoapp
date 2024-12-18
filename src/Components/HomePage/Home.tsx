//Import Favorite and Today Graph Components
import Favorites from "./Favorites";
import TodayRecap from "./TodayRecap";
//Import Custom Type
import { coinDataType } from "../../Types/AppTypes";
//Props Type for UserID, Color and Favorite
type propsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
};

const Home = ({ currentID, tempColor, tempFavArray }: propsType) => {
  //Home Page Structure
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
