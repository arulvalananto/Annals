import axios from "../../axios";
import { FETCHED_USER, REMOVED_USER } from "../reducers/user.reducer";

export const register =
  (credentials, handleLoading, handleError) => async (dispatch) => {
    try {
      handleError("");
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
      if (err.response) return handleError(err.response?.data.message);

      handleError(err.message);
    } finally {
      handleLoading(false);
    }
  };

export const login =
  (credentials, handleLoading, handleError) => async (dispatch) => {
    try {
      handleError("");
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
      if (err.response) return handleError(err.response?.data.message);

      handleError(err.message);
    } finally {
      handleLoading(false);
    }
  };

export const getCurrentUser =
  (handleLoading, handleError) => async (dispatch) => {
    handleError("");
    handleLoading(true);

    const token = localStorage.getItem("token");
    if (!token) return handleLoading(false);

    const result = await axios.get("/auth/current-user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch(FETCHED_USER(result.data.user));
    try {
    } catch (err) {
      if (err.response) return handleError(err.response.data.messgae);
      handleError(err.message);
    } finally {
      handleLoading(false);
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(REMOVED_USER());
};
