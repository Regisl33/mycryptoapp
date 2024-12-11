import React from "react";
import { coinProps } from "../../Types/AppTypes";

const Volume = ({ coin }: coinProps) => {
  return (
    <>
      {coin.total_volume
        ? coin.total_volume.toString().length > 11
          ? (coin.total_volume / 1000000000).toFixed(3) + "G $"
          : (coin.total_volume / 1000000).toFixed(3) + "M $"
        : "-"}
    </>
  );
};

export default Volume;
