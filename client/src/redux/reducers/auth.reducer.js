import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isPending: true,
    user: {
      email: "",
      fullName: "",
      googleId: "",
      diary: { pages: [] },
      ideas: { entries: [] },
      passwords: { pin: "", entries: [] },
      todos: []
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
    requestSucceed: (request, action) => {
      return {
        ...request,
        isPending: false,
      };
    },
    fetchUser: (auth, action) => {
      return {
        ...auth,
        user: action.payload.user,
        isLoggedIn: action.payload.loggedIn,
      };
    },
    addTodo: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          todos: [...auth.user.todos, action.payload],
        },
      };
    },
  },
});

export const {
  fetchUser,
  authFailed,
  addTodo,
  requestFailed,
  requestPending,
  requestSucceed,
} = slice.actions;

export default slice.reducer;

// Selector

const selectAuth = (state) => state.auth;

export const selectUser = createSelector(selectAuth, (el) => el.user);
export const selectIsLoggedIn = createSelector(
  selectAuth,
  (el) => el.isLoggedIn
);
export const selectLoading = createSelector(selectAuth, (el) => el.isPending);

export const selectTodos = createSelector(selectAuth, (el) => el.user.todos);
