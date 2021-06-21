import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "../reducers/reducer";

export const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware()],
});
