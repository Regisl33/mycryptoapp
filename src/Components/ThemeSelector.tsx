import React, { useEffect } from "react";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";

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
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

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

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  return (
    <div className="theme-selector">
      <div className="theme-container">
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
            <circle
              className="background"
              cx="17.8"
              cy="17.8"
              r="17.8"
            ></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline
              className="check"
              points="11.78 18.12 15.55 22.23 25.17 12.87"
            ></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
