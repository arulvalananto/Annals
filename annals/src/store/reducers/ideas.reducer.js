import { createSlice } from "@reduxjs/toolkit";

const ideaSlice = createSlice({
  name: "ideas",
  initialState: [],
  reducers: {
    FETCH_IDEAS: (ideas, action) => {
      return action.payload;
    },
    ADD_IDEA: (ideas, action) => {
      return [...ideas, action.payload];
    },
    UPDATE_IDEA: (ideas, action) => {
      const { id, values } = action.payload;
      return ideas.map((idea) =>
        idea.id === id ? { ...idea, ...values } : idea
      );
    },
    DELETE_IDEA: (ideas, action) => {
      const { id } = action.payload;
      return ideas.filter((idea) => idea.id !== id);
    },
  },
});

export const { FETCH_IDEAS, ADD_IDEA, UPDATE_IDEA, DELETE_IDEA } =
  ideaSlice.actions;

export default ideaSlice.reducer;
