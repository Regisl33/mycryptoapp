import React from "react";
import { coinProps } from "../../Types/AppTypes";

const Months6 = ({ coin }: coinProps) => {
  return (
    <>
      {coin.price_change_percentage_200d_in_currency
        ? coin.price_change_percentage_200d_in_currency.toFixed(1) + "%"
        : "-"}
    </>
  );
};

export default Months6;
