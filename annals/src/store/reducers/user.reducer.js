const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    FETCHED_USER: (state, action) => {
      return action.payload;
    },
    REMOVED_USER: (state, action) => {
      return null;
    },
  },
});

export const { FETCHED_USER, REMOVED_USER } = userSlice.actions;

export default userSlice.reducer;

// Selectors
