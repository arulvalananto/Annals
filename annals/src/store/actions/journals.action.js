import axios from "../../api/axios";
import {
  ADDED_JOURNAL,
  FETCHED_JOURNALS,
  UPDATED_JOURNAL,
} from "../reducers/journals.reducer";
import {
  clearFailure,
  clearSuccess,
  setFailure,
  setSuccess,
} from "./notification.actions";
import { setLoading, clearLoading } from "./loader.actions";

export const fetchJournals = (handleLoading) => async (dispatch) => {
  try {
    dispatch(clearFailure());
    handleLoading(true);

    const result = await axios.get("/journals/get");
    dispatch(FETCHED_JOURNALS(result.data.journals));
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));

    dispatch(setFailure(err.message));
  } finally {
    handleLoading(false);
  }
};

export const addJournal = (content, history) => async (dispatch) => {
  try {
    dispatch(clearFailure());
    dispatch(setLoading(true));

    const result = await axios.post("/journals/add", { content });
    dispatch(ADDED_JOURNAL(result.data.journals));

    dispatch(setSuccess("Journal Added"));
    setTimeout(() => {
      dispatch(clearSuccess(""));
    }, 3000);

    history.push("/journals");
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));

    dispatch(setFailure(err.message));
  } finally {
    dispatch(clearLoading(false));
  }
};

export const updateJournal = (content, id, history) => async (dispatch) => {
  try {
    dispatch(clearFailure());
    dispatch(setLoading(true));

    const result = await axios.patch(`/journals/update/${id}`, { content });
    dispatch(UPDATED_JOURNAL({ id, values: result.data.journals }));

    dispatch(setSuccess("Journal Updated"));
    setTimeout(() => {
      dispatch(clearSuccess(""));
    }, 3000);

    history.push("/journals");
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response?.data.message));

    dispatch(setFailure(err.message));
    dispatch(clearLoading(false));
  } finally {
    dispatch(clearLoading(false));
  }
};
