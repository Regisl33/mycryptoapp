//Import Dependencies
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//Import Custom Type
import { coinDataType } from "../../Types/AppTypes";
//Define our State Type
type stateType = {
  data: coinDataType[];
};
//Initialise the state with an Empty Array
const initialState: stateType = {
  data: [],
};
//Store the Api Url in a variable to make cleaner code
const COINGECKO_MAIN_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";

//Create and Export the Async Thunk that is in charge of fetching the Api data through Axios
export const fetchCoinData = createAsyncThunk(
  "coins/fetchCoinData",
  async () => {
    let apiResponse: coinDataType[] = [];
    try {
      await axios
        .get(COINGECKO_MAIN_URL)
        .then((res) => (apiResponse = res.data));
    } catch (error) {
      console.log(error);
    }
    return apiResponse;
  }
);
//Coin Data Reducer that is in charge of taking the fetched data and storing it in our Redux Store.
const coinSlice = createSlice({
  name: "/coin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCoinData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
//Create and Export our Custom Function that will allow us to get the Data of the Favorite Coins for a spécified user
export const getCurrentUserFavorite = (
  arr: string[],
  coinData: coinDataType[]
): coinDataType[] => {
  //Define Coin Array from the full coinData fetch from the Api and our newArray that will only contain the user Favorite Coins
  let coinArray = [...coinData];
  let newArray: coinDataType[] = [];
  //Map our favorite IDs array, for each coin, map the full coinData and push in the newArray the coin that's ID is matching our ID from the favorite ID list.
  arr.map((id) =>
    coinArray.map((coin) => (coin.id === id ? newArray.push(coin) : null))
  );

  return newArray;
};

export default coinSlice.reducer;
