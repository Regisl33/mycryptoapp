//Import Custom Type
import { colorPicker } from "../Utils/ColorUtilities";
//Props Type for the Value we Pass the Component and a Type to Decide how the Component Will Display
type propsType = {
  value?: number;
  valueType: "$" | "%" | "Date";
};

const DisplayOfValue = ({ value, valueType }: propsType) => {
  //Display of $ Value
  const dollarValue = () => {
    return (
      <span>
        {value
          ? value.toString().length > 11
            ? (value / 1000000000).toFixed(3) + "G $"
            : (value / 1000000).toFixed(2) + "M $"
          : "-"}
      </span>
    );
  };
  //Display of % value
  const percentValue = () => {
    return (
      <span style={{ color: colorPicker(value) }}>
        {value ? value.toFixed(1) + "%" : "-"}
      </span>
    );
  };
  //Display of "Date" Value
  const dateValue = () => {
    return (
      <span
        style={
          value && value > -1
            ? { color: colorPicker(1) }
            : { color: colorPicker(-1) }
        }
      >
        {value ? (value > -1 ? "ATH" : value.toFixed(1) + "%") : "-"}
      </span>
    );
  };
  //This Function Decide How the Data is Displayed Based on The Value Type
  const returnSwitch = (): JSX.Element => {
    switch (valueType) {
      case "$":
        return dollarValue();
      case "%":
        return percentValue();
      case "Date":
        return dateValue();
      default:
        return <p>TypeError!</p>;
    }
  };
  //This Value is Return and is the Result of the Return Switch
  const element = returnSwitch();

  return element;
};

export default DisplayOfValue;
