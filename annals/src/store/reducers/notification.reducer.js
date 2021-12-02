import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notify",
  initialState: {
    failure: "",
    success: "",
  },
  reducers: {
    SET_FAILURE: (notify, action) => {
      return { ...notify, failure: action.payload };
    },
    CLEAR_FAILURE: (notify, action) => {
      return { ...notify, failure: "" };
    },
    SET_SUCCESS: (notify, action) => {
      return { ...notify, success: action.payload };
    },
    CLEAR_SUCCESS: (notify, action) => {
      return { ...notify, success: "" };
    },
  },
});

export default notificationSlice.reducer;

export const { SET_FAILURE, SET_SUCCESS, CLEAR_FAILURE, CLEAR_SUCCESS } =
  notificationSlice.actions;
