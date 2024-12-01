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
        return b.market_cap - a.market_cap;
      case "Market Capreverse":
        return a.market_cap - b.market_cap;
      case "Price":
        return b.current_price - a.current_price;
      case "Pricereverse":
        return a.current_price - b.current_price;
      case "Volume":
        return b.total_volume - a.total_volume;
      case "Volumereverse":
        return a.total_volume - b.total_volume;
      case "1h":
        return (
          b.price_change_percentage_1h_in_currency -
          a.price_change_percentage_1h_in_currency
        );
      case "1hreverse":
        return (
          a.price_change_percentage_1h_in_currency -
          b.price_change_percentage_1h_in_currency
        );
      case "1j":
        return (
          b.price_change_percentage_24h_in_currency -
          a.price_change_percentage_24h_in_currency
        );
      case "1jreverse":
        return (
          a.price_change_percentage_24h_in_currency -
          b.price_change_percentage_24h_in_currency
        );
      case "7j":
        return (
          b.price_change_percentage_7d_in_currency -
          a.price_change_percentage_7d_in_currency
        );
      case "7jreverse":
        return (
          a.price_change_percentage_7d_in_currency -
          b.price_change_percentage_7d_in_currency
        );
      case "14j":
        return (
          b.price_change_percentage_14d_in_currency -
          a.price_change_percentage_14d_in_currency
        );
      case "14jreverse":
        return (
          a.price_change_percentage_14d_in_currency -
          b.price_change_percentage_14d_in_currency
        );
      case "30j":
        return (
          b.price_change_percentage_30d_in_currency -
          a.price_change_percentage_30d_in_currency
        );
      case "30jreverse":
        return (
          a.price_change_percentage_30d_in_currency -
          b.price_change_percentage_30d_in_currency
        );
      case "200j":
        return (
          b.price_change_percentage_200d_in_currency -
          a.price_change_percentage_200d_in_currency
        );
      case "200jreverse":
        return (
          a.price_change_percentage_200d_in_currency -
          b.price_change_percentage_200d_in_currency
        );
      case "1y":
        return (
          b.price_change_percentage_1y_in_currency -
          a.price_change_percentage_1y_in_currency
        );
      case "1yreverse":
        return (
          a.price_change_percentage_1y_in_currency -
          b.price_change_percentage_1y_in_currency
        );
      case "Ath":
        return b.ath_change_percentage - a.ath_change_percentage;
      case "Athreverse":
        return a.ath_change_percentage - b.ath_change_percentage;

      default:
        return b.market_cap_rank - a.market_cap_rank;
    }
  });
  return newArray;
};
