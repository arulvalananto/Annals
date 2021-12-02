import {
  CLEAR_FAILURE,
  CLEAR_SUCCESS,
  SET_FAILURE,
  SET_SUCCESS,
} from "../reducers/notification.reducer";

export const setFailure = (message) => (dispatch) =>
  dispatch(SET_FAILURE(message));

export const clearFailure = () => (dispatch) => dispatch(CLEAR_FAILURE());

export const setSuccess = (message) => (dispatch) =>
  dispatch(SET_SUCCESS(message));

export const clearSuccess = () => (dispatch) => dispatch(CLEAR_SUCCESS());
