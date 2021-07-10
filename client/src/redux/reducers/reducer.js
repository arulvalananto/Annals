import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth.reducer";
import messageReducer from "./message.reducer";

export default combineReducers({
    auth: authReducer,
    message: messageReducer,
});
