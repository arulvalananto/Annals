import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: '',
    },
    reducers: {
        SET_LOADING: (loader, action) => {
            return { isLoading: true };
        },
        CLEAR_LOADING: (loader, action) => {
            return { isLoading: false };
        },
    },
});

export default loaderSlice.reducer;

export const { SET_LOADING, CLEAR_LOADING } = loaderSlice.actions;
