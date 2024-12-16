import { useEffect } from "react";
import { colorType } from "../Types/AppTypes";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";

type propsType = {
  currentID: number;
  tempColor: string;
  handleColorSwitch: (color: string) => Promise<void>;
};

const BackgroundSelector = ({
  currentID,
  tempColor,
  handleColorSwitch,
}: propsType) => {
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

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  return (
    <div className="background-selector">
      {tempColor.length > 0
        ? tempColor[0] === "D"
          ? displayColors(darkColors)
          : displayColors(lightColors)
        : userData && userData.color[0] === "D"
        ? displayColors(darkColors)
        : displayColors(lightColors)}
    </div>
  );
};

export default BackgroundSelector;
