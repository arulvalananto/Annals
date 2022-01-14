import { clearLoading, setLoading } from "./loader.actions";
import axios from "../../api/axios";
import {
  ADD_IDEA,
  FETCH_IDEAS,
  DELETE_IDEA,
  UPDATE_IDEA,
} from "../reducers/ideas.reducer";
import { errResponse } from "../../utils/helpers";

export const fetchIdeas = () => async (dispatch) => {
  try {
    dispatch(setLoading());

    const result = await axios.get("/ideas/get");
    dispatch(FETCH_IDEAS(result.data.ideas));
  } catch (err) {
    errResponse(err);
  } finally {
    dispatch(clearLoading());
  }
};
export const addIdea = (idea, clearFields) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const result = await axios.post("/ideas/add", idea);
    dispatch(ADD_IDEA(result.data.idea));

    clearFields();
  } catch (err) {
    errResponse(err);
  } finally {
    dispatch(clearLoading());
  }
};
export const updateIdea = (id, values) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const response = await axios.patch(`/ideas/update/${id}`, values);
    console.log(response);
    dispatch(UPDATE_IDEA({ id, values }));
  } catch (err) {
    errResponse(err);
  } finally {
    dispatch(clearLoading());
  }
};
export const deleteIdea = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());

    await axios.delete(`/ideas/delete/${id}`);
    dispatch(DELETE_IDEA(id));
  } catch (err) {
    errResponse(err);
  } finally {
    dispatch(clearLoading());
  }
};
