import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isPending: true,
    user: {},
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
    userFetched: (auth, action) => {
      return {
        ...auth,
        user: action.payload.user,
        isLoggedIn: action.payload.loggedIn,
      };
    },
    pageAdded: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          diary: [...auth.user.diary, action.payload],
        },
      };
    },
    pageUpdated: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          diary: auth.user.diary.map((page) =>
            page._id === action.payload._id ? (page = action.payload) : page
          ),
        },
      };
    },
    pinCreated: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          passwords: { ...auth.user.passwords, pin: action.payload.pin },
        },
      };
    },
    passwordFetched: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          passwords: { ...auth.user.passwords, entries: action.payload },
        },
      };
    },
    passwordDeleted: (auth, action) => {
      console.log(action.payload);
      return {
        ...auth,
        user: {
          ...auth.user,
          passwords: {
            ...auth.user.passwords,
            entries: auth.user.passwords.entries.filter(
              (password) => password._id !== action.payload.id
            ),
          },
        },
      };
    },
    ideaAdded: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          ideas: [...auth.user.ideas, action.payload],
        },
      };
    },
    ideaUpdated: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          ideas: auth.user.ideas.map((idea) =>
            idea._id === action.payload._id ? (idea = action.payload) : idea
          ),
        },
      };
    },
    ideaDeleted: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          ideas: auth.user.ideas.filter(
            (idea) => idea._id !== action.payload.id
          ),
        },
      };
    },
    taskAdded: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          tasks: [...auth.user.tasks, action.payload],
        },
      };
    },
    taskStatusUpdated: (auth, action) => {
      const { id, status } = action.payload;

      const updatedTasks = auth.user.tasks.map((el) =>
        el._id === id ? { ...el, status } : el
      );
      return {
        ...auth,
        user: {
          ...auth.user,
          tasks: updatedTasks,
        },
      };
    },
    taskDeleted: (auth, action) => {
      return {
        ...auth,
        user: {
          ...auth.user,
          tasks: auth.user.tasks.filter(
            (task) => task._id !== action.payload.id
          ),
        },
      };
    },
  },
});

export const {
  requestFailed,
  requestPending,
  requestSucceed,
  userFetched,
  pageAdded,
  pageUpdated,
  pinCreated,
  passwordFetched,
  passwordDeleted,
  ideaAdded,
  ideaUpdated,
  ideaDeleted,
  taskAdded,
  taskStatusUpdated,
  taskDeleted,
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
export const selectDiary = createSelector(selectAuth, (el) => el.user.diary);
export const selectPasswords = createSelector(
  selectAuth,
  (el) => el.user.passwords
);
export const selectIdeas = createSelector(selectAuth, (el) => el.user.ideas);
export const selectTasks = createSelector(selectAuth, (el) => el.user.tasks);
