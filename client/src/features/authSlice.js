import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
    name: "auth",
    initialState: {
        userData: {},
    },
    reducers: {
        fetchUser: (auth, action) => {
            return {
                ...auth,
                userData: action.payload,
            };
        },
    },
});

export const { fetchUser } = slice.actions;

export default slice.reducer;

// Selector

export const selectUser = createSelector((state) => state.auth.user.user);
