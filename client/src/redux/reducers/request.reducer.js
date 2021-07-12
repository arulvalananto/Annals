import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "request",
  initialState: {
    isPending: true,
  },
  reducers: {
    requestPending: (request, action) => {
      return {
        ...request,
        isPending: true,
      };
    },
    requestFailed: (request, action) => {
      return {
        ...request,
        isPending: false,
      };
    },
    requestSucceed: (request, action) => {
      return {
        ...request,
        isPending: false,
      };
    },
  },
});

export const { requestPending, requestFailed, requestSucceed } = slice.actions;

export default slice.reducer;

// Selector

const selectRequest = (state) => state.request;

export const selectLoading = createSelector(
  selectRequest,
  (el) => el.isPending
);
