export type coinDataType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
  price_change_percentage_14d_in_currency: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  price_change_percentage_200d_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export type globalChartDataType = {
  name: string;
  price: number;
  size: number;
  fill: string;
};

export type chartDataType = {
  date: string;
  price: number;
};

export type chartHeaderDataType = {
  duration: number;
  label: string;
};

export type colorType = {
  class: string;
  color: string;
};
export type homeFav = {
  fav: string;
  class: string;
};
export type coinProps = {
  coin: coinDataType;
};
//Props Type for UserID, the Current Coin, and the tempFavArray State
export type IDCoinTempFavArrPropsType = {
  currentID: number;
  coin: coinDataType;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};
//Props Type for UserID, the tempColor, and the tempFavArray State
export type IDColorTempFavArrPropsType = {
  currentID: number;
  tempColor: string;
  tempFavArray: coinDataType[];
  setTempFavArray: React.Dispatch<React.SetStateAction<coinDataType[]>>;
};
