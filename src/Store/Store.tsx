import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import UserApi from "../Api/UserApi";
import coinSlice from "../Features/CoinGeeckoData/CoinDataSlice";

const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
    coinData: coinSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
