import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "auth",
  initialState: {
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
    authFailed: (auth, action) => {
      return {
        ...auth,
        isLoggedIn: false,
      };
    },
    fetchUser: (auth, action) => {
      return {
        ...auth,
        user: action.payload.user,
        isLoggedIn: action.payload.loggedIn,
      };
    },
  },
});

export const { fetchUser, authFailed } = slice.actions;

export default slice.reducer;

// Selector

const selectAuth = (state) => state.auth;

export const selectUser = createSelector(selectAuth, (el) => el.user);
export const selectIsLoggedIn = createSelector(
  selectAuth,
  (el) => el.isLoggedIn
);
