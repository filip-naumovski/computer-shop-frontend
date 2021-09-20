import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/reducers";
import { shopApi } from "../services/computerShopService";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const defaultState = {};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
  defaultState,
});

setupListeners(store.dispatch);
