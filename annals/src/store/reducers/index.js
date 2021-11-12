import { combineReducers } from "redux";

import userReducer from "../reducers/user.reducer";
import journalsReducer from "./journals.reducer";
import notificationReducer from "./notification.reducer";
import loaderReducer from "./loader.reducer";

export default combineReducers({
  user: userReducer,
  notify: notificationReducer,
  journals: journalsReducer,
  loader: loaderReducer,
});
