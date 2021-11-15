import { combineReducers } from "redux";

import userReducer from "../reducers/user.reducer";
import notificationReducer from "./notification.reducer";
import loaderReducer from "./loader.reducer";
import journalsReducer from "./journals.reducer";
import ideasReducer from "./ideas.reducer";

export default combineReducers({
  user: userReducer,
  notify: notificationReducer,
  loader: loaderReducer,
  journals: journalsReducer,
  ideas: ideasReducer,
});
