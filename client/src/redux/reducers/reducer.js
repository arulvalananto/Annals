import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth.reducer";
import messageReducer from "./message.reducer";
import requestReducer from "./request.reducer";

export default combineReducers({
  auth: authReducer,
  message: messageReducer,
  request: requestReducer,
});
