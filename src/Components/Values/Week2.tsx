import React from "react";
import { coinProps } from "../../Types/AppTypes";

const Week2 = ({ coin }: coinProps) => {
  return (
    <>
      {coin.price_change_percentage_14d_in_currency
        ? coin.price_change_percentage_14d_in_currency.toFixed(1) + "%"
        : "-"}
    </>
  );
};

export default Week2;
