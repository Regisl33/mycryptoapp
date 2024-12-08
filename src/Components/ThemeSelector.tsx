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
          key={color.class}
          className={
            tempColor.length > 0 && tempColor !== userData?.color
              ? tempColor === color.class
                ? tempColor[0] === "D"
                  ? `active Dbox ${color.class}`
                  : `active Lbox ${color.class}`
                : tempColor[0] === "D"
                ? `Dbox ${color.class}`
                : `Lbox ${color.class}`
              : userData?.color === color.class
              ? userData.color[0] === "D"
                ? `active Dbox ${color.class}`
                : `active Lbox ${color.class}`
              : userData && userData.color[0] === "D"
              ? `Dbox ${color.class}`
              : `Lbox ${color.class}`
          }
          id={color.class}
          onClick={() => handleColorSwitch(color.class)}
        >
          {tempColor.length > 0 && tempColor !== userData?.color
            ? tempColor === color.class
              ? "Selected"
              : color.color
            : userData?.color === color.class
            ? "Selected"
            : color.color}
        </div>
      );
    });
  };

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
      <div className="background-selector">
        {tempColor.length > 0
          ? tempColor[0] === "D"
            ? displayColors(darkColors)
            : displayColors(lightColors)
          : userData && userData.color[0] === "D"
          ? displayColors(darkColors)
          : displayColors(lightColors)}
      </div>
    </div>
  );
};

export default ThemeSelector;
