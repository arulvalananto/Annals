const { createSlice } = require("@reduxjs/toolkit");

const messageSlice = createSlice({
  name: "message",
  initialState: {
    success: "",
    failure: "",
  },
  reducers: {
    setSuccessMessage: (message, action) => {
      return {
        ...message,
        success: action.payload,
      };
    },
    clearSuccessMessage: (message, action) => {
      return {
        ...message,
        success: "",
      };
    },
    setFailureMessage: (message, action) => {
      return {
        ...message,
        failure: action.payload,
      };
    },
    clearFailureMessage: (message, action) => {
      return {
        ...message,
        failure: "",
      };
    },
  },
});

export const {
  setSuccessMessage,
  clearSuccessMessage,
  setFailureMessage,
  clearFailureMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
