//Import Dependencies
import { useEffect } from "react";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import Custom Type
import { colorType } from "../../Types/AppTypes";
//Props Type for User ID, Temp Color and the handleColorSwitch Function to Change the Current Background Theme and the Current Color
type propsType = {
  color: colorType;
  currentID: string;
  tempColor: string;
  handleColorSwitch: (color: string) => Promise<void>;
};

const BackgroundOptions = ({
  color,
  currentID,
  tempColor,
  handleColorSwitch,
}: propsType) => {
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //This Handle the Color Name Display, if the Color is Selected, the Selected Mention will Appear
  const optionText = (
    <p>
      {tempColor.length > 0 && tempColor !== userData?.color
        ? tempColor === color.class
          ? "Selected"
          : color.color
        : userData?.color === color.class
        ? "Selected"
        : color.color}
    </p>
  );
  //Each Color Option Return
  const colorOptionStructure = (
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
      {optionText}
    </div>
  );

  return colorOptionStructure;
};

export default BackgroundOptions;
