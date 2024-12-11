import React from "react";
import { coinProps } from "../../Types/AppTypes";

const Year = ({ coin }: coinProps) => {
  return (
    <>
      {coin.price_change_percentage_1y_in_currency
        ? coin.price_change_percentage_1y_in_currency.toFixed(1) + "%"
        : "-"}
    </>
  );
};

export default Year;
