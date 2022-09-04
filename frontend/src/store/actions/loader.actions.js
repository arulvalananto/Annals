import { CLEAR_LOADING, SET_LOADING } from '../reducers/loader.reducer';

export const setLoading = () => (dispatch) => dispatch(SET_LOADING());

export const clearLoading = () => (dispatch) => dispatch(CLEAR_LOADING());
