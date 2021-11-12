import axios from "../../axios";
import {
  ADDED_JOURNAL,
  DELETED_JOURNAL,
  FETCHED_JOURNALS,
  UPDATED_JOURNAL,
} from "../reducers/journals.reducer";
import {
  removeFailure,
  removeSuccess,
  setFailure,
  setSuccess,
} from "./notification.actions";
import { setLoading, clearLoading } from "./loader.actions";

export const fetchJournals = (handleLoading) => async (dispatch) => {
  try {
    dispatch(removeFailure());
    handleLoading(true);

    const token = localStorage.getItem("token");
    if (!token) return handleLoading(false);

    const result = await axios.get("/journals/get", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(FETCHED_JOURNALS(result.data.journals));
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));

    dispatch(setFailure(err.message));
  } finally {
    handleLoading(false);
  }
};

export const addJournal = (values, handleLoading) => async (dispatch) => {
  try {
    dispatch(removeFailure());
    handleLoading(true);

    const token = localStorage.getItem("token");
    if (!token) return handleLoading(false);

    const result = await axios.post(
      "/journals/add",
      { content: values },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(ADDED_JOURNAL(result.data.journals));
    dispatch(setSuccess("Journal Added"));
    setTimeout(() => removeSuccess(""), 3000);
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));

    dispatch(setFailure(err.message));
  } finally {
    handleLoading(false);
  }
};

export const updateJournal =
  (values, id, handleLoading) => async (dispatch) => {
    try {
      dispatch(removeFailure());
      handleLoading(true);

      const token = localStorage.getItem("token");
      if (!token) return handleLoading(false);

      const result = await axios.post(`/journals/update/${id}`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(UPDATED_JOURNAL({ id, values: result.data.journals }));
    } catch (err) {
      if (err.response) return dispatch(setFailure(err.response?.data.message));

      dispatch(setFailure(err.message));
    } finally {
      handleLoading(false);
    }
  };

export const deleteJournal = (id) => async (dispatch) => {
  try {
    dispatch(removeFailure());
    dispatch(setLoading());

    const token = localStorage.getItem("token");
    if (!token) return dispatch(clearLoading());

    await axios.delete(`/journals/delete/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(DELETED_JOURNAL());
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));

    dispatch(setFailure(err.message));
  } finally {
    dispatch(clearLoading());
  }
};
