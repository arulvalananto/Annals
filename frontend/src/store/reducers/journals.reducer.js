const { createSlice } = require("@reduxjs/toolkit");

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    synced: false,
    docs: [],
  },
  reducers: {
    FETCHED_JOURNALS: (journals, action) => {
      return { ...journals, docs: action.payload, synced: true };
    },
    ADDED_JOURNAL: (journals, action) => {
      return { ...journals, docs: [...journals.docs, action.payload] };
    },
    UPDATED_JOURNAL: (journals, action) => {
      const updatedJournal = journals.docs.map((journal) =>
        journal === action.payload.id
          ? { ...journal, ...action.payload.values }
          : journal
      );
      return { ...journals, docs: updatedJournal };
    },
    DELETED_JOURNAL: (journals, action) => {
      return {
        ...journals,
        docs: journals.docs.filter(
          (journal) => journal.id !== action.payload.id
        ),
      };
    },
  },
});

export const {
  FETCHED_JOURNALS,
  DELETED_JOURNAL,
  ADDED_JOURNAL,
  UPDATED_JOURNAL,
} = journalSlice.actions;

export default journalSlice.reducer;

// Selectors
