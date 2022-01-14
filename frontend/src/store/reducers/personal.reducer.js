import { createSlice } from "@reduxjs/toolkit";

const personalSlice = createSlice({
  name: "personal",
  initialState: {
    docs: {
      passwords: [],
      cards: [],
      cryptoWallets: [],
    },
    synced: false,
  },
  reducers: {
    FETCH_PERSONAL_DATA: (personal, action) => {
      return { ...personal, docs: action.payload, synced: true };
    },
    ADD_PERSONAL_DATA: (personal, action) => {
      const category = `${action.payload.category}s`;

      return {
        ...personal,
        docs: {
          ...personal.docs,
          [category]: [...personal[category], action.payload],
        },
      };
    },
    DELETE_PERSONAL_DATA: (personal, action) => {
      const category = `${action.payload.category}s`;

      return {
        ...personal,
        docs: {
          ...personal.docs,
          [category]: personal[category].filter(
            (ele) => ele._id !== action.payload.id
          ),
        },
      };
    },
  },
});

export const { FETCH_PERSONAL_DATA, ADD_PERSONAL_DATA, DELETE_PERSONAL_DATA } =
  personalSlice.actions;

export default personalSlice.reducer;
