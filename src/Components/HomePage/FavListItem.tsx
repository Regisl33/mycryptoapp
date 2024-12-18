import { coinDataType } from "../../Types/AppTypes";
import DisplayOfValue from "../DisplayOfValue";

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
        <DisplayOfValue valueType="$" value={coin.market_cap} />
      </li>
      <li>{coin.market_cap_rank}</li>
      <li>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_1h_in_currency}
        />
      </li>
      <li>
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_24h_in_currency}
        />
      </li>
      <li className="bigscreen">
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_7d_in_currency}
        />
      </li>
      <li className="bigscreen">
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_30d_in_currency}
        />
      </li>
      <li className="bigscreen">
        <DisplayOfValue
          valueType="%"
          value={coin.price_change_percentage_1y_in_currency}
        />
      </li>
    </ul>
  );
};

export default FavListItem;
