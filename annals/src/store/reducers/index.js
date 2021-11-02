import { combineReducers } from "redux";

import userReducer from "../reducers/user.reducer";
import notificationReducer from "./notification.reducer";

export default combineReducers({
  user: userReducer,
  notify: notificationReducer,
});
