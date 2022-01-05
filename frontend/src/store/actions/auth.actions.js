import axios from "../../api/axios";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../reducers/auth.reducer";
import {
  clearFailure,
  clearSuccess,
  setFailure,
  setSuccess,
} from "./notification.actions";

export const register =
  (credentials, handleLoading, history) => async (dispatch) => {
    try {
      dispatch(clearFailure());
      handleLoading(true);

      const result = await axios.post("/auth/register", credentials);

      localStorage.setItem("token", result.data.token);

      dispatch(setSuccess("User Registered"));
      setTimeout(() => {
        dispatch(clearSuccess());
        history.push("/sign-in");
      }, 2000);
    } catch (err) {
      if (err.response) return dispatch(setFailure(err.response?.data.message));
      dispatch(setFailure(err.message));
    } finally {
      handleLoading(false);
    }
  };

export const login =
  (credentials, handleLoading, history) => async (dispatch) => {
    try {
      dispatch(clearFailure());
      handleLoading(true);

      const result = await axios.post("/auth/login", credentials);
      localStorage.setItem("token", result.data.token);

      const response = await axios.get("/auth/current-user");
      dispatch(LOGIN_SUCCESS(response.data.user));

      history.push("/");
    } catch (err) {
      if (err.response) return dispatch(setFailure(err.response?.data.message));

      dispatch(setFailure(err.message));
    } finally {
      handleLoading(false);
    }
  };

export const getCurrentUser = (handleLoading) => async (dispatch) => {
  try {
    dispatch(clearFailure());
    const result = await axios.get("/auth/current-user");

    dispatch(LOGIN_SUCCESS(result.data.user));
    handleLoading(false);
  } catch (err) {
    dispatch(LOGIN_FAIL());
    handleLoading(false);

    if (err.response) return dispatch(setFailure(err.response?.data.message));
    dispatch(setFailure(err.message));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(LOGOUT());
};

export const forgotPassword =
  (values, handleLoading, handleIsCodeSent) => async (dispatch) => {
    try {
      dispatch(clearFailure());
      handleLoading(true);

      const result = await axios.post("/auth/forgot-password", values);

      dispatch(setSuccess(result.data.message));
      handleIsCodeSent();
      setTimeout(() => dispatch(clearSuccess()), 3000);
    } catch (err) {
      if (err.response) return dispatch(setFailure(err.response?.data.message));

      dispatch(setFailure(err.message));
    } finally {
      handleLoading(false);
    }
  };

export const resetPassword =
  (values, handleLoading, handleIsPasswordChanged) => async (dispatch) => {
    try {
      dispatch(clearFailure());
      handleLoading(true);

      await axios.patch("/auth/reset-password", values);

      handleIsPasswordChanged();
    } catch (err) {
      if (err.response) return dispatch(setFailure(err.response?.data.message));

      dispatch(setFailure(err.message));
    } finally {
      handleLoading(false);
    }
  };
