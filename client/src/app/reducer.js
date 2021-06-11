import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import messageReducer from "../features/messageSlice";

export default combineReducers({
    auth: authReducer,
    message: messageReducer,
});
