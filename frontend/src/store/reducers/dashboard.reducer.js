import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        synced: false,
        docs: {
            days: 0,
            journals: 0,
            tasks: 0,
            ideas: 0,
            focus: '',
        },
        focuses: {
            docs: [],
            synced: false,
        },
    },
    reducers: {
        FETCH_DASHBOARD: (state, action) => {
            return {
                ...state,
                docs: { ...state.docs, ...action.payload },
                synced: true,
            };
        },
        FETCH_FOCUSES: (state, action) => {
            return {
                ...state,
                focuses: {
                    ...state.focuses,
                    docs: action.payload,
                    synced: true,
                },
            };
        },
        UPDATE_JOURNAL_COUNT: (state, action) => {
            return {
                ...state,
                docs: { ...state.docs, journals: state.docs.journals + 1 },
            };
        },
        UPDATE_FOCUS: (state, action) => {
            return { ...state, docs: { ...state.docs, focus: action.payload } };
        },
        UPDATE_FOCUS_LIST: (state, action) => {
            return {
                ...state,
                focuses: {
                    ...state.focuses,
                    docs: state.focuses.docs.map((focus) =>
                        moment(new Date(focus.date).toDateString()).isSame(
                            new Date(Date.now()).toDateString()
                        )
                            ? {
                                  ...focus,
                                  agenda: [...focus.agenda, action.payload],
                              }
                            : focus
                    ),
                },
            };
        },
    },
});

export const {
    FETCH_DASHBOARD,
    UPDATE_JOURNAL_COUNT,
    FETCH_FOCUSES,
    UPDATE_FOCUS,
    UPDATE_FOCUS_LIST,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
