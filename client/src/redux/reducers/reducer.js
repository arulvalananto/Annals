import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import messageReducer from "./messageSlice";

export default combineReducers({
    auth: authReducer,
    message: messageReducer,
});
