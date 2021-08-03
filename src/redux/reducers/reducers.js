import { combineReducers } from "redux";
import authReducer from "../auth/authSlice";
import { shopApi } from "../../services/computerShopService";

const reducers = combineReducers({
  auth: authReducer,
  [shopApi.reducerPath]: shopApi.reducer,
});

export default reducers;
