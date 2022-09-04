import { createSlice } from '@reduxjs/toolkit';

const ideaSlice = createSlice({
    name: 'ideas',
    initialState: {
        synced: false,
        docs: [],
    },
    reducers: {
        FETCH_IDEAS: (ideas, action) => {
            return { ...ideas, docs: action.payload, synced: true };
        },
        ADD_IDEA: (ideas, action) => {
            return { ...ideas, docs: [...ideas.docs, action.payload] };
        },
        UPDATE_IDEA: (ideas, action) => {
            const { id, values } = action.payload;
            return {
                ...ideas,
                docs: ideas.docs.map((idea) =>
                    idea.id === id ? { ...idea, ...values } : idea
                ),
            };
        },
        DELETE_IDEA: (ideas, action) => {
            return {
                ...ideas,
                docs: ideas.docs.filter((idea) => idea.id !== action.payload),
            };
        },
    },
});

export const { FETCH_IDEAS, ADD_IDEA, UPDATE_IDEA, DELETE_IDEA } =
    ideaSlice.actions;

export default ideaSlice.reducer;
