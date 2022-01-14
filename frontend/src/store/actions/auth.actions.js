import toast from "react-hot-toast";

import axios from "../../api/axios";
import { errResponse } from "../../utils/helpers";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../reducers/auth.reducer";

export const register =
  (credentials, handleLoading, history) => async (dispatch) => {
    try {
      handleLoading(true);

      const result = await axios.post("/auth/register", credentials);
      localStorage.setItem("token", result.data.token);

      toast.success("User registered");
      history.push("/sign-in");
    } catch (err) {
      errResponse(err);
    } finally {
      handleLoading(false);
    }
  };

export const login =
  (credentials, handleLoading, history) => async (dispatch) => {
    try {
      handleLoading(true);

      const result = await axios.post("/auth/login", credentials);
      localStorage.setItem("token", result.data.token);

      const response = await axios.get("/auth/current-user");
      dispatch(LOGIN_SUCCESS(response.data.user));

      history.push("/");
    } catch (err) {
      errResponse(err);
    } finally {
      handleLoading(false);
    }
  };

export const getCurrentUser = (handleLoading) => async (dispatch) => {
  try {
    const result = await axios.get("/auth/current-user");

    dispatch(LOGIN_SUCCESS(result.data.user));
    handleLoading(false);
  } catch (err) {
    dispatch(LOGIN_FAIL());
    handleLoading(false);

    errResponse(err);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  if (sessionStorage.getItem("verified")) sessionStorage.removeItem("verified");
  dispatch(LOGOUT());
};

export const forgotPassword =
  (values, handleLoading, handleIsCodeSent) => async (dispatch) => {
    try {
      handleLoading(true);

      const result = await axios.post("/auth/forgot-password", values);

      toast.success(result.data.message);
      handleIsCodeSent();
    } catch (err) {
      errResponse(err);
    } finally {
      handleLoading(false);
    }
  };

export const resetPassword =
  (values, handleLoading, handleIsPasswordChanged) => async (dispatch) => {
    try {
      handleLoading(true);

      await axios.patch("/auth/reset-password", values);

      handleIsPasswordChanged();
    } catch (err) {
      errResponse(err);
    } finally {
      handleLoading(false);
    }
  };
