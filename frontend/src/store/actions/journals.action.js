import toast from "react-hot-toast";

import axios from "../../api/axios";
import {
  ADDED_JOURNAL,
  FETCHED_JOURNALS,
  UPDATED_JOURNAL,
} from "../reducers/journals.reducer";
import { setLoading, clearLoading } from "./loader.actions";

export const fetchJournals = (handleLoading) => async (dispatch) => {
  try {
    handleLoading(true);

    const result = await axios.get("/journals/get");
    dispatch(FETCHED_JOURNALS(result.data.journals));
  } catch (err) {
    if (err.response) return toast.error(err.response.data.message);
    toast.error(err.message);
  } finally {
    handleLoading(false);
  }
};

export const addJournal = (content, history) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const result = await axios.post("/journals/add", { content });
    dispatch(ADDED_JOURNAL(result.data.journals));

    toast.success("Journal added");

    history.push("/journals");
  } catch (err) {
    if (err.response) return toast.error(err.response.data.message);
    toast.error(err.message);
  } finally {
    dispatch(clearLoading(false));
  }
};

export const updateJournal = (content, id, history) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const result = await axios.patch(`/journals/update/${id}`, { content });
    dispatch(UPDATED_JOURNAL({ id, values: result.data.journals }));

    toast.success("Journal updated");
    history.push("/journals");
  } catch (err) {
    if (err.response) return toast.error(err.response.data.message);
    toast.error(err.message);
    dispatch(clearLoading(false));
  } finally {
    dispatch(clearLoading(false));
  }
};
