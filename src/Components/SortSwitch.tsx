import { coinDataType } from "../Types/AppTypes";

export const sortSwitch = (
  arr: coinDataType[],
  selectedSort: string
): coinDataType[] => {
  let newArray = [...arr];

  newArray.sort((a, b) => {
    switch (selectedSort) {
      case "Rank":
        return a.market_cap_rank - b.market_cap_rank;
      case "Rankreverse":
        return b.market_cap_rank - a.market_cap_rank;
      case "Market Cap":
        return a.market_cap - b.market_cap;
      case "Market Capreverse":
        return b.market_cap - a.market_cap;
      case "Price":
        return a.current_price - b.current_price;
      case "Pricereverse":
        return b.current_price - a.current_price;
      case "Volume":
        return a.total_volume - b.total_volume;
      case "Volumereverse":
        return b.total_volume - a.total_volume;
      case "1h":
        return (
          a.price_change_percentage_1h_in_currency -
          b.price_change_percentage_1h_in_currency
        );
      case "1hreverse":
        return (
          b.price_change_percentage_1h_in_currency -
          a.price_change_percentage_1h_in_currency
        );
      case "1j":
        return (
          a.price_change_percentage_24h_in_currency -
          b.price_change_percentage_24h_in_currency
        );
      case "1jreverse":
        return (
          b.price_change_percentage_24h_in_currency -
          a.price_change_percentage_24h_in_currency
        );
      case "7j":
        return (
          a.price_change_percentage_7d_in_currency -
          b.price_change_percentage_7d_in_currency
        );
      case "7jreverse":
        return (
          b.price_change_percentage_7d_in_currency -
          a.price_change_percentage_7d_in_currency
        );
      case "14j":
        return (
          a.price_change_percentage_14d_in_currency -
          b.price_change_percentage_14d_in_currency
        );
      case "14jreverse":
        return (
          b.price_change_percentage_14d_in_currency -
          a.price_change_percentage_14d_in_currency
        );
      case "30j":
        return (
          a.price_change_percentage_30d_in_currency -
          b.price_change_percentage_30d_in_currency
        );
      case "30jreverse":
        return (
          b.price_change_percentage_30d_in_currency -
          a.price_change_percentage_30d_in_currency
        );
      case "200j":
        return (
          a.price_change_percentage_200d_in_currency -
          b.price_change_percentage_200d_in_currency
        );
      case "200jreverse":
        return (
          b.price_change_percentage_200d_in_currency -
          a.price_change_percentage_200d_in_currency
        );
      case "1y":
        return (
          a.price_change_percentage_1y_in_currency -
          b.price_change_percentage_1y_in_currency
        );
      case "1yreverse":
        return (
          b.price_change_percentage_1y_in_currency -
          a.price_change_percentage_1y_in_currency
        );
      case "Ath":
        return a.ath_change_percentage - b.ath_change_percentage;
      case "Athreverse":
        return b.ath_change_percentage - a.ath_change_percentage;

      default:
        return a.market_cap_rank - b.market_cap_rank;
    }
  });
  return newArray;
};
