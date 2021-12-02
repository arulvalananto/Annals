import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "passwords",
  initialState: [],
  reducers: {
    FETCH_PASSWORDS: (ideas, action) => {
      return action.payload;
    },
    ADD_PASSWORD: (ideas, action) => {
      return [...ideas, action.payload];
    },
    UPDATE_PASSWORD: (ideas, action) => {
      const { id, values } = action.payload;
      return ideas.map((idea) =>
        idea.id === id ? { ...idea, ...values } : idea
      );
    },
    DELETE_PASSWORD: (ideas, action) => {
      return ideas.filter((idea) => idea.id !== action.payload);
    },
  },
});

export const {
  FETCH_PASSWORDS,
  ADD_PASSWORD,
  UPDATE_PASSWORD,
  DELETE_PASSWORD,
} = passwordSlice.actions;

export default passwordSlice.reducer;
