import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "auth",
  initialState: {
    isPending: true,
    isLoggedIn: false,
    user: {
      email: "",
      fullName: "",
      googleId: "",
      diary: { pages: [] },
      ideas: { entries: [] },
      passwords: { pin: "", entries: [] },
    },
  },
  reducers: {
    requestPending: (auth, action) => {
      return {
        ...auth,
        isPending: true,
      };
    },
    requestFailed: (auth, action) => {
      return {
        ...auth,
        isPending: false,
        isLoggedIn: false,
      };
    },
    fetchUser: (auth, action) => {
      return {
        ...auth,
        user: action.payload.user,
        isLoggedIn: action.payload.loggedIn,
        isPending: false,
      };
    },
  },
});

export const { fetchUser, requestFailed, requestPending } = slice.actions;

export default slice.reducer;

// Selector

const selectAuth = (state) => state.auth;

export const selectUser = createSelector(selectAuth, (el) => el.user);
export const selectLoading = createSelector(selectAuth, (el) => el.isPending);
export const selectIsLoggedIn = createSelector(
  selectAuth,
  (el) => el.isLoggedIn
);
