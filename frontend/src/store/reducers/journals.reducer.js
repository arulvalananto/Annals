const { createSlice } = require("@reduxjs/toolkit");

const journalSlice = createSlice({
  name: "journal",
  initialState: null,
  reducers: {
    FETCHED_JOURNALS: (journals, action) => {
      return action.payload;
    },
    ADDED_JOURNAL: (journals, action) => {
      return [...journals, action.payload];
    },
    UPDATED_JOURNAL: (journals, action) => {
      const updatedJournal = journals.map((journal) =>
        journal === action.payload.id
          ? { ...journal, ...action.payload.values }
          : journal
      );
      return updatedJournal;
    },
    DELETED_JOURNAL: (journals, action) => {
      return journals.filter((journal) => journal.id !== action.payload.id);
    },
  },
});

export const { FETCHED_JOURNALS, DELETED_JOURNAL, ADDED_JOURNAL, UPDATED_JOURNAL } =
  journalSlice.actions;

export default journalSlice.reducer;

// Selectors
