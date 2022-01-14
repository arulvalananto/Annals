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
      const category = `${action.payload.category}s`;

      return {
        ...personal,
        [category]: [...personal[category], action.payload],
      };
    },
    DELETE_PERSONAL_DATA: (personal, action) => {
      const category = `${action.payload.category}s`;

      return {
        ...personal,
        [category]: personal[category].filter(
          (ele) => ele._id !== action.payload.id
        ),
      };
    },
  },
});

export const { FETCH_PERSONAL_DATA, ADD_PERSONAL_DATA, DELETE_PERSONAL_DATA } =
  personalSlice.actions;

export default personalSlice.reducer;
