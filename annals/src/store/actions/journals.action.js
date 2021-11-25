import axios, { axiosConfig } from "../../api/axios";
import {
  ADDED_JOURNAL,
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

    const result = await axios.get("/journals/get", axiosConfig);
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
    dispatch(removeFailure());
    dispatch(setLoading(true));

    const result = await axios.post("/journals/add", { content }, axiosConfig);
    dispatch(ADDED_JOURNAL(result.data.journals));

    dispatch(setSuccess("Journal Added"));
    setTimeout(() => {
      dispatch(removeSuccess(""));
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
    dispatch(removeFailure());
    dispatch(setLoading(true));

    const result = await axios.patch(
      `/journals/update/${id}`,
      { content },
      axiosConfig
    );
    dispatch(UPDATED_JOURNAL({ id, values: result.data.journals }));

    dispatch(setSuccess("Journal Updated"));
    setTimeout(() => {
      dispatch(removeSuccess(""));
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
