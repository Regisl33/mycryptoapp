import { coinDataType } from "../Types/AppTypes";
import Day from "./Values/Day";
import Hours from "./Values/Hours";
import MarketCap from "./Values/MarketCap";
import Months from "./Values/Months";
import Week from "./Values/Week";
import Year from "./Values/Year";

type propsType = {
  coin: coinDataType;
};

const FavListItem = ({ coin }: propsType) => {
  return (
    <ul>
      <li>{coin.symbol.toUpperCase()}</li>
      <li className="bigscreen">{coin.name}</li>
      <li>
        {coin.current_price ? coin.current_price.toLocaleString() + "$" : "-"}
      </li>
      <li className="bigscreen">
        <MarketCap coin={coin} />
      </li>
      <li>{coin.market_cap_rank}</li>
      <li>
        <Hours coin={coin} />
      </li>
      <li>
        <Day coin={coin} />
      </li>
      <li className="bigscreen">
        <Week coin={coin} />
      </li>
      <li className="bigscreen">
        <Months coin={coin} />
      </li>
      <li className="bigscreen">
        <Year coin={coin} />
      </li>
    </ul>
  );
};

export default FavListItem;
