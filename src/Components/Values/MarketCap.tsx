import { coinProps } from "../../Types/AppTypes";

const MarketCap = ({ coin }: coinProps) => {
  return (
    <>
      {coin.market_cap
        ? coin.market_cap.toString().length > 11
          ? (coin.market_cap / 1000000000).toFixed(3) + "G $"
          : (coin.market_cap / 1000000).toFixed(3) + "M $"
        : "-"}
    </>
  );
};

export default MarketCap;
