import axios from "../../axios";
import { FETCHED_USER, REMOVED_USER } from "../reducers/user.reducer";
import {
  removeFailure,
  removeSuccess,
  setFailure,
  setSuccess,
} from "./notification.actions";

export const register = (credentials, handleLoading) => async (dispatch) => {
  try {
    dispatch(removeFailure());
    handleLoading(true);

    const result = await axios.post("/auth/register", credentials);

    localStorage.setItem("token", result.data.token);

    const response = await axios.get("/auth/current-user", {
      headers: {
        authorization: `Bearer ${result.data.token}`,
      },
    });

    dispatch(FETCHED_USER(response.data.user));
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));
    dispatch(setFailure(err.message));
  } finally {
    handleLoading(false);
  }
};

export const login = (credentials, handleLoading) => async (dispatch) => {
  try {
    dispatch(removeFailure());
    handleLoading(true);

    const result = await axios.post("/auth/login", credentials);

    localStorage.setItem("token", result.data.token);

    const response = await axios.get("/auth/current-user", {
      headers: {
        authorization: `Bearer ${result.data.token}`,
      },
    });

    dispatch(FETCHED_USER(response.data.user));
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));

    dispatch(setFailure(err.message));
  } finally {
    handleLoading(false);
  }
};

export const getCurrentUser = (handleLoading) => async (dispatch) => {
  try {
    dispatch(removeFailure());
    handleLoading(true);

    const token = localStorage.getItem("token");
    if (!token) return handleLoading(false);

    const result = await axios.get("/auth/current-user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log(result);

    dispatch(FETCHED_USER(result.data.user));
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));

    localStorage.removeItem("token");

    dispatch(setFailure(err.message));
  } finally {
    handleLoading(false);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(REMOVED_USER());
};

export const forgotPassword =
  (values, handleLoading, handleIsCodeSent) => async (dispatch) => {
    try {
      dispatch(removeFailure());
      handleLoading(true);

      const result = await axios.post("/auth/forgot-password", values);
      dispatch(setSuccess(result.data.message));
      handleIsCodeSent();
      setTimeout(() => dispatch(removeSuccess()), 3000);
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
      dispatch(removeFailure());
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
