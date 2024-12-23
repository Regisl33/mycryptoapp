//Import Dependencies
import { useEffect } from "react";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import Custom Type
import { colorType } from "../../Types/AppTypes";
import BackgroundOptions from "./BackgroundOptions";
//Props Type for User ID, Temp Color and the handleColorSwitch Function to Change the Current Background Theme
type propsType = {
  currentID: string;
  tempColor: string;
  handleColorSwitch: (color: string) => Promise<void>;
};

const BackgroundSelector = ({
  currentID,
  tempColor,
  handleColorSwitch,
}: propsType) => {
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Define Light Colors
  const lightColors: colorType[] = [
    { class: "Lcolor1", color: "#0066ff" },
    { class: "Lcolor2", color: "#00ffff" },
    { class: "Lcolor3", color: "#00ff33" },
    { class: "Lcolor4", color: "#ff99cc" },
    { class: "Lcolor5", color: "#9933ff" },
    { class: "Lcolor6", color: "#ccff00" },
    { class: "Lcolor7", color: "#ff9900" },
  ];
  //Define Dark Colors
  const darkColors: colorType[] = [
    { class: "Dcolor1", color: "#000000" },
    { class: "Dcolor2", color: "#333333" },
    { class: "Dcolor3", color: "#000033" },
    { class: "Dcolor4", color: "#000066" },
    { class: "Dcolor5", color: "#330099" },
    { class: "Dcolor6", color: "#ff0000" },
    { class: "Dcolor7", color: "#cc3300" },
  ];
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //Map the Dark Colors
  const mappedDarkTheme = (
    <>
      {darkColors.map((color) => (
        <BackgroundOptions
          color={color}
          currentID={currentID}
          tempColor={tempColor}
          handleColorSwitch={handleColorSwitch}
        />
      ))}
    </>
  );
  //Map the Light Colors
  const mappedLightTheme = (
    <>
      {lightColors.map((color) => (
        <BackgroundOptions
          color={color}
          currentID={currentID}
          tempColor={tempColor}
          handleColorSwitch={handleColorSwitch}
        />
      ))}
    </>
  );
  //Return the Colors Based on the Theme
  const BackgroundSelectorDisplay = (
    <div className="background-selector">
      {tempColor.length > 0
        ? tempColor[0] === "D"
          ? mappedDarkTheme
          : mappedLightTheme
        : userData && userData.color[0] === "D"
        ? mappedDarkTheme
        : mappedLightTheme}
    </div>
  );

  return BackgroundSelectorDisplay;
};

export default BackgroundSelector;
