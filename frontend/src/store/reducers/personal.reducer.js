import { createSlice } from "@reduxjs/toolkit";

const personalSlice = createSlice({
  name: "personal",
  initialState: {
    passwords: [],
    cards: [],
    cryptoWallets: [],
  },
  reducers: {
    FETCH_PERSONAL_DATA: (personal, action) => {
      return action.payload;
    },
    ADD_PERSONAL_DATA: (personal, action) => {
      return {
        ...personal,
        [`${action.payload.category}s`]: [
          ...personal[`${action.payload.category}s`],
          action.payload,
        ],
      };
    },
  },
});

export const { FETCH_PERSONAL_DATA, ADD_PERSONAL_DATA } = personalSlice.actions;

export default personalSlice.reducer;
