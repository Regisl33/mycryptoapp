//Import Custom Hook and Function
import { useColorMutation } from "../../Features/LandingPage/UserSlice";
//Import Components for the Theme Selector, the Range Selector and the Manage Favorite Screen
import RangeSelector from "./RangeSelector";
import ThemeSelector from "./ThemeSelector";
import DisconnectBtn from "./DisconnectBtn";
import ParamFavorite from "./ParamFavorite";
//Import Custom Types
import { coinDataType } from "../../Types/AppTypes";
import { colorMutation } from "../../Types/LandingTypes";
import BackgroundSelector from "./BackgroundSelector";
//Props Type for the Temp Color, Temp Fav Array and currentID State and the Setters for needReload and isLoggedIn
type propsType = {
  tempColor: string;
  setNeedReload: React.Dispatch<React.SetStateAction<boolean>>;
  setTempColor: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
  currentID: number | undefined;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};

const Parameters = ({
  setIsLoggedIn,
  setCurrentID,
  currentID,
  tempColor,
  setTempColor,
  tempFavArray,
  setTempFavArray,
  setNeedReload,
}: propsType) => {
  //Define Color Mutation
  const [colorMutation] = useColorMutation();
  //Create the HandleColorSwitch Witch is Used in Background-Selector and Theme-Selector Components, it handle all temp and DB changes for the color
  const handleColorSwitch = async (color: string) => {
    if (currentID) {
      let newColor: colorMutation = {
        user: {
          color,
        },
        id: currentID,
      };

      try {
        setTempColor(color);
        await colorMutation(newColor).unwrap();
      } catch (err) {
        console.log(err);
      }
    }
  };
  //Full Parameters Page Structure
  const ParameterPage = (
    <div className="main-container">
      <RangeSelector
        currentID={currentID as number}
        tempColor={tempColor}
        setNeedReload={setNeedReload}
      />
      <ThemeSelector
        currentID={currentID as number}
        tempColor={tempColor}
        setTempColor={setTempColor}
        handleColorSwitch={handleColorSwitch}
      />
      <BackgroundSelector
        currentID={currentID as number}
        tempColor={tempColor}
        handleColorSwitch={handleColorSwitch}
      />
      <ParamFavorite
        tempColor={tempColor}
        currentID={currentID as number}
        tempFavArray={tempFavArray}
        setTempFavArray={setTempFavArray}
      />
      <DisconnectBtn
        currentID={currentID}
        tempColor={tempColor}
        setCurrentID={setCurrentID}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );

  return ParameterPage;
};

export default Parameters;
