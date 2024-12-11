import React from "react";
import { coinProps } from "../../Types/AppTypes";

const Ath = ({ coin }: coinProps) => {
  return (
    <>
      {coin.ath_change_percentage
        ? coin.ath_change_percentage > -1
          ? "ATH"
          : coin.ath_change_percentage.toFixed(1) + "%"
        : "-"}
    </>
  );
};

export default Ath;
