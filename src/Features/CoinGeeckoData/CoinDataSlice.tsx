import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { coinDataType } from "../../Types/AppTypes";
import axios from "axios";

type stateType = {
  status: "Ready" | "Fulfilled" | "Loading" | "Error";
  data: coinDataType[];
};

const initialState: stateType = {
  status: "Ready",
  data: [],
};

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";

export const fetchCoinData = createAsyncThunk(
  "coins/fetchCoinData",
  async () => {
    let apiResponse: coinDataType[] = [];
    try {
      await axios.get(COINGECKO_URL).then((res) => (apiResponse = res.data));
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
    builder.addCase(fetchCoinData.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(fetchCoinData.fulfilled, (state, action) => {
      state.status = "Fulfilled";
      state.data = action.payload;
    });
    builder.addCase(fetchCoinData.rejected, (state, action) => {
      state.status = "Error";
    });
  },
});

export default coinSlice.reducer;
