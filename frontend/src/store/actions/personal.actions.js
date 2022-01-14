import toast from "react-hot-toast";

import axios from "../../api/axios";
import { errResponse } from "../../utils/helpers";
import {
  FETCH_PERSONAL_DATA,
  ADD_PERSONAL_DATA,
  DELETE_PERSONAL_DATA,
} from "../reducers/personal.reducer";

export const fetchPersonalData = (handleLoading) => async (dispatch) => {
  try {
    const response = await axios.get("/personal");
    dispatch(FETCH_PERSONAL_DATA(response.data));
  } catch (err) {
    errResponse(err);
  } finally {
    handleLoading(false);
  }
};

export const createPersonalData =
  (loading, values, history) => async (dispatch) => {
    try {
      loading(true);
      const response = await axios.post("/personal/create", values);
      if (response.status === 201) {
        dispatch(ADD_PERSONAL_DATA(values));

        toast.success(`New ${values.category} added`);
        history.push("/personal");
      }
    } catch (err) {
      errResponse(err);
    } finally {
      loading(false);
    }
  };

export const deletePersonalData =
  (loading, id, category, pickedId) => async (dispatch) => {
    try {
      loading(true);

      const response = await axios.delete(`/personal/${id}/${category}`);
      if (response.status === 200) {
        dispatch(DELETE_PERSONAL_DATA({ id, category }));

        toast.success(`${category} deleted`);
        pickedId("");
      }
    } catch (err) {
      errResponse(err);
    } finally {
      loading(false);
    }
  };
