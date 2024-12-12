import { ReactNode } from "react";
import { colorPicker } from "../Utils/ColorUtilities";

type propsType = {
  value?: number;
  valueType: "$" | "%" | "Date";
};

const DisplayOfValue = ({ value, valueType }: propsType) => {
  const dollarValue = () => {
    return (
      <span style={{ color: colorPicker(value) }}>
        {value
          ? value.toString().length > 11
            ? (value / 1000000000).toFixed(3) + "G $"
            : (value / 1000000).toFixed(3) + "M $"
          : "-"}
      </span>
    );
  };
  const percentValue = () => {
    return <span>{value ? value.toFixed(1) + "%" : "-"}</span>;
  };
  const dateValue = () => {
    return (
      <span>{value ? (value > -1 ? "ATH" : value.toFixed(1) + "%") : "-"}</span>
    );
  };

  const returnSwitch = (): ReactNode => {
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

  const element = returnSwitch();

  return element;
};

export default DisplayOfValue;
