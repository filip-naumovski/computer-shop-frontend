import { combineReducers } from "redux";
import authReducer from "../auth/authSlice";
import notificationsReducer from "../notification/notificationSlice";
import searchSlice from "redux/search/searchSlice";
import { shopApi } from "../../services/computerShopService";

const reducers = combineReducers({
  auth: authReducer,
  notification: notificationsReducer,
  search: searchSlice,
  [shopApi.reducerPath]: shopApi.reducer,
});

export default reducers;
