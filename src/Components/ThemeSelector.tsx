//Import Dependencies
import { useEffect } from "react";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
//Props type for userId, TempColor, Changing TempColor and handeling the update of the color in the database
type propsType = {
  currentID: number;
  tempColor: string;
  setTempColor: React.Dispatch<React.SetStateAction<string>>;
  handleColorSwitch: (color: string) => Promise<void>;
};

const ThemeSelector = ({
  currentID,
  tempColor,
  setTempColor,
  handleColorSwitch,
}: propsType) => {
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //this function handle every color switch for the temp color and the database update
  const handleChange = () => {
    if (tempColor.length > 0) {
      if (tempColor[0] === "D") {
        setTempColor("Lcolor1");
        handleColorSwitch("Lcolor1");
      } else {
        setTempColor("Dcolor1");
        handleColorSwitch("Dcolor1");
      }
    } else {
      if (userData && userData.color[0] === "D") {
        setTempColor("Lcolor1");
        handleColorSwitch("Lcolor1");
      } else {
        setTempColor("Dcolor1");
        handleColorSwitch("Dcolor1");
      }
    }
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //Label for the theme checkbox
  const checkboxLabel = (
    <label
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "Dshadow"
            : "Lshadow"
          : userData?.color[0] === "D"
          ? "Dshadow"
          : "Lshadow"
      }
      htmlFor="dark-mode-checkbox"
    >
      Toggle Dark Theme
    </label>
  );
  //checkbox to switch theme
  const themeCheckbox = (
    <div className="checkbox-wrapper-31">
      <input
        type="checkbox"
        id="dark-mode-checkbox"
        checked={
          tempColor.length > 0
            ? tempColor[0] === "D"
              ? true
              : false
            : userData && userData.color[0] === "D"
            ? true
            : false
        }
        onChange={() => handleChange()}
      />
      <svg viewBox="0 0 35.6 35.6">
        <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
        <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
        <polyline
          className="check"
          points="11.78 18.12 15.55 22.23 25.17 12.87"
        ></polyline>
      </svg>
    </div>
  );
  //Page theme selector HTML return
  const themeSelectorReturn = (
    <div className="theme-container">
      {checkboxLabel}
      {themeCheckbox}
    </div>
  );

  return themeSelectorReturn;
};

export default ThemeSelector;
