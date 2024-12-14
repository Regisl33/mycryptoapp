//Import Dependencies
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
//Import UserApi and CoinSliceReducer to create the Store
import UserApi from "../Api/UserApi";
import coinSlice from "../Features/CoinGeeckoData/CoinDataSlice";
//Creating our Store with The User Api and the Coin Slice Reducer
const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
    coinData: coinSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
});
//Create Custom type based on the Store Type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
//Create and Export Custom détailled Type for useDispatch and useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
