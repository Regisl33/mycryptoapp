//Import Dependencies
import { useState, useEffect, ChangeEvent } from "react";
//Import Custom Hook
import {
  useGetCurrentUserQuery,
  useRangeMutation,
} from "../../Features/LandingPage/UserSlice";
//Import Custom Type
import { rangeMutation } from "../../Types/LandingTypes";
//Props Type for UserID, Temp Color and Setter for needReload
type propsType = {
  currentID: number;
  tempColor: string;
  setNeedReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const RangeSelector = ({ currentID, tempColor, setNeedReload }: propsType) => {
  //Define States for the Range Value and the Error Message if Needed
  const [rangeValue, setRangeValue] = useState(24);
  const [errorMessage, setErrorMessage] = useState("");
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //Define Range Mutation
  const [rangeMutation] = useRangeMutation();
  //This Function Handle All Range Change in the User Api
  const handleDBChange = (value: number) => {
    let rangePost: rangeMutation = {
      user: {
        range: value,
      },
      id: currentID,
    };
    try {
      rangeMutation(rangePost).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  //This Function Handle the Change of the Range Value on the Range and Text Input
  const handleChange = (value: string) => {
    setRangeValue(parseInt(value));
    setNeedReload(true);
    setErrorMessage("");
    handleDBChange(parseInt(value));
  };
  //This Function Test is the Change Made Through the Text Input is Valid, if so it Makes the Change Using handleChange, if not it sets an Error Message
  const handleInputVerif = (value: string) => {
    if (parseInt(value) >= 1 && parseInt(value) <= 250) {
      handleChange(value);
    } else {
      setErrorMessage("Please Enter a Number Between 1 and 250");
    }
  };
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //Text-Range Value-Input
  const textInput = (
    <input
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "Dinput"
            : "Linput"
          : userData?.color[0] === "D"
          ? "Dinput"
          : "Linput"
      }
      type="text"
      id="Text-Range"
      value={rangeValue}
      autoComplete="off"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleInputVerif(e.target.value)
      }
    />
  );
  //Displays the Label With the Appropriate Shadow
  const inputLabel = (
    <label
      htmlFor="Range-Input"
      className={
        tempColor.length > 0
          ? tempColor[0] === "D"
            ? "Dshadow"
            : "Lshadow"
          : userData?.color[0] === "D"
          ? "Dshadow"
          : "Lshadow"
      }
    >
      Default Amount of Coin Displayed in Tables:
    </label>
  );
  //Range-Value Range Input
  const RangeInput = (
    <input
      type="range"
      id="Range-Input"
      min={1}
      max={250}
      value={rangeValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange(e.target.value)
      }
    />
  );
  //Full Feature Structure, add the Error Message if Needed
  const RangeContainerStructure = (
    <div className="range-container">
      <div className="input-range-container">
        {inputLabel}
        <div className="input-container">
          {RangeInput}
          {textInput}
        </div>
      </div>
      <p>{errorMessage.length > 0 ? errorMessage : null}</p>
    </div>
  );

  return RangeContainerStructure;
};

export default RangeSelector;
