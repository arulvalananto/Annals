const { createSlice } = require("@reduxjs/toolkit");

const journalSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    FETCHED_JOURNALS: (state, action) => {},
    ADD_JOURNAL: (state, action) => {},
    DELETE_JOURNAL: (state, action) => {},
  },
});

export const { FETCHED_JOURNALS, DELETE_JOURNAL, ADD_JOURNAL } =
  journalSlice.actions;

export default journalSlice.reducer;

// Selectors
