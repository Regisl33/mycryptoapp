import React from "react";
import { coinProps } from "../../Types/AppTypes";

const Hours = ({ coin }: coinProps) => {
  return (
    <>
      {coin.price_change_percentage_1h_in_currency
        ? coin.price_change_percentage_1h_in_currency.toFixed(1) + "%"
        : "-"}
    </>
  );
};

export default Hours;
