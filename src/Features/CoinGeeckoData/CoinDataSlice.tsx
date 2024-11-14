import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { coinDataType } from "../../Types/AppTypes";
import axios from "axios";

type stateType = {
  data: coinDataType[];
  globalData: {};
};

const initialState: stateType = {
  data: [],
  globalData: {},
};

const COINGECKO_MAIN_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";

const COINGECKO_GLOBAL_URL = `https://api.coingecko.com/api/v3/global`;

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

export const fetchGlobalData = createAsyncThunk(
  "coins/fetchGlobalData",
  async () => {
    let apiResponse = {};
    try {
      await axios
        .get(COINGECKO_GLOBAL_URL)
        .then((res) => (apiResponse = res.data.data));
    } catch (error) {
      console.log(error);
    }
    return apiResponse;
  }
);

const coinSlice = createSlice({
  name: "/coin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCoinData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchGlobalData.fulfilled, (state, action) => {
      state.globalData = action.payload;
    });
  },
});

export default coinSlice.reducer;
