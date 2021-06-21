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
        clearSuccessMesage: (message, action) => {
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
        clearFailureMesage: (message, action) => {
            return {
                ...message,
                failure: "",
            };
        },
    },
});

export const {
    setSuccessMessage,
    clearSuccessMesage,
    setFailureMessage,
    clearFailureMesage,
} = messageSlice.actions;

export default messageSlice.reducer;
