import React, { useEffect, useState } from "react";
import {
  useGetCurrentUserQuery,
  useColorMutation,
} from "../Features/LandingPage/UserSlice";
import { colorMutation } from "../Types/LandingTypes";
import { colorType } from "../Types/AppTypes";

type propsType = {
  currentID: number;
  tempColor: string;
  setTempColor: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeSelector = ({ currentID, tempColor, setTempColor }: propsType) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  const lightColors: colorType[] = [
    { class: "Lcolor1", color: "#0066ff" },
    { class: "Lcolor2", color: "#00ffff" },
    { class: "Lcolor3", color: "#00ff33" },
    { class: "Lcolor4", color: "#ff99cc" },
    { class: "Lcolor5", color: "#9933ff" },
    { class: "Lcolor6", color: "#ccff00" },
    { class: "Lcolor7", color: "#ff9900" },
  ];

  const darkColors: colorType[] = [
    { class: "Dcolor1", color: "#000000" },
    { class: "Dcolor2", color: "#333333" },
    { class: "Dcolor3", color: "#000033" },
    { class: "Dcolor4", color: "#000066" },
    { class: "Dcolor5", color: "#330099" },
    { class: "Dcolor6", color: "#ff0000" },
    { class: "Dcolor7", color: "#cc3300" },
  ];

  const [colorMutation] = useColorMutation();

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

  const displayColors = (arr: colorType[]) => {
    return arr.map((color: colorType) => {
      return (
        <div
          className={
            tempColor.length > 0 && tempColor !== userData?.color
              ? tempColor === color.class
                ? darkTheme
                  ? `active Dbox ${color.class}`
                  : `active Lbox ${color.class}`
                : darkTheme
                ? `Dbox ${color.class}`
                : `Lbox ${color.class}`
              : userData?.color === color.class
              ? darkTheme
                ? `active Dbox ${color.class}`
                : `active Lbox ${color.class}`
              : darkTheme
              ? `Dbox ${color.class}`
              : `Lbox ${color.class}`
          }
          id={color.class}
          onClick={() => handleColorSwitch(color.class)}
        >
          {color.color}
        </div>
      );
    });
  };

  useEffect(() => {
    if (!isError) {
      console.log(error);
    }
  }, []);

  return (
    <div className="theme-selector">
      <div className="theme-container">
        <label htmlFor="dark-mode-checkbox">Toggle Dark Theme</label>
        <input
          type="checkbox"
          id="dark-mode-checkbox"
          checked={darkTheme ? true : false}
          onChange={() => setDarkTheme(!darkTheme)}
        />
      </div>
      <div className="background-selector">
        {darkTheme ? displayColors(darkColors) : displayColors(lightColors)}
      </div>
    </div>
  );
};

export default ThemeSelector;
