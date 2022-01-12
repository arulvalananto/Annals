import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import notificationReducer from "./notification.reducer";
import loaderReducer from "./loader.reducer";
import journalsReducer from "./journals.reducer";
import ideasReducer from "./ideas.reducer";
import passwordReducer from "./password.reducer";
import personalReducer from "./personal.reducer";

export default combineReducers({
  auth: authReducer,
  notify: notificationReducer,
  loader: loaderReducer,
  journals: journalsReducer,
  ideas: ideasReducer,
  passwords: passwordReducer,
  personal: personalReducer,
});
