import { combineReducers } from "redux";
import authReducer from "../auth/authSlice";
import notificationsReducer from "../notification/notificationSlice";
import { shopApi } from "../../services/computerShopService";

const reducers = combineReducers({
  auth: authReducer,
  notification: notificationsReducer,
  [shopApi.reducerPath]: shopApi.reducer,
});

export default reducers;
