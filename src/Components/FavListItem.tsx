import { coinDataType } from "../Types/AppTypes";

type propsType = {
  coin: coinDataType;
};

const FavListItem = ({ coin }: propsType) => {
  return (
    <ul className="FavListItem">
      <li>{coin.symbol}</li>
      <li>{coin.name}</li>
      <li>{coin.current_price}</li>
      <li>{coin.market_cap}</li>
      <li>{coin.market_cap_rank}</li>
      <li>{coin.price_change_percentage_1h_in_currency}</li>
      <li>{coin.price_change_percentage_24h_in_currency}</li>
      <li>{coin.price_change_percentage_7d_in_currency}</li>
      <li>{coin.price_change_percentage_30d_in_currency}</li>
      <li>{coin.price_change_percentage_1y_in_currency}</li>
    </ul>
  );
};

export default FavListItem;
