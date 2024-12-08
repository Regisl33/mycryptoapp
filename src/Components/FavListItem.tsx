import { coinDataType } from "../Types/AppTypes";

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
        {coin.market_cap
          ? (coin.market_cap / 1000000000).toFixed(2) + "G $"
          : "-"}
      </li>
      <li>{coin.market_cap_rank}</li>

      <li>
        {coin.price_change_percentage_1h_in_currency
          ? coin.price_change_percentage_1h_in_currency.toFixed(1) + "%"
          : "-"}
      </li>
      <li>
        {coin.price_change_percentage_24h_in_currency
          ? coin.price_change_percentage_24h_in_currency.toFixed(1) + "%"
          : "-"}
      </li>
      <li className="bigscreen">
        {coin.price_change_percentage_7d_in_currency
          ? coin.price_change_percentage_7d_in_currency.toFixed(1) + "%"
          : "-"}
      </li>
      <li className="bigscreen">
        {coin.price_change_percentage_30d_in_currency
          ? coin.price_change_percentage_30d_in_currency.toFixed(1) + "%"
          : "-"}
      </li>
      <li className="bigscreen">
        {coin.price_change_percentage_1y_in_currency
          ? coin.price_change_percentage_1y_in_currency.toFixed(1) + "%"
          : "-"}
      </li>
    </ul>
  );
};

export default FavListItem;
