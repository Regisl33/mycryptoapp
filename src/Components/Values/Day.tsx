import React from "react";
import { coinProps } from "../../Types/AppTypes";

const Day = ({ coin }: coinProps) => {
  return (
    <>
      {coin.price_change_percentage_24h_in_currency
        ? coin.price_change_percentage_24h_in_currency.toFixed(1) + "%"
        : "-"}
    </>
  );
};

export default Day;
