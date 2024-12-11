import React from "react";
import { coinProps } from "../../Types/AppTypes";

const Months = ({ coin }: coinProps) => {
  return (
    <>
      {coin.price_change_percentage_30d_in_currency
        ? coin.price_change_percentage_30d_in_currency.toFixed(1) + "%"
        : "-"}
    </>
  );
};

export default Months;
