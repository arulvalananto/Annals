import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    synced: false,
    docs: {
      days: 0,
      journals: 0,
      tasks: 0,
      focus: "",
    },
  },
  reducers: {
    FETCH_DASHBOARD: (state, action) => {
      return {
        ...state,
        docs: { ...state.docs, ...action.payload },
        synced: true,
      };
    },
  },
});

export const { FETCH_DASHBOARD } = dashboardSlice.actions;

export default dashboardSlice.reducer;
