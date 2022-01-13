import toast from "react-hot-toast";

import axios from "../../api/axios";
import {
  FETCH_PERSONAL_DATA,
  ADD_PERSONAL_DATA,
} from "../reducers/personal.reducer";

export const fetchPersonalData = (handleLoading) => async (dispatch) => {
  try {
    const response = await axios.get("/personal");
    dispatch(FETCH_PERSONAL_DATA(response.data));
  } catch (err) {
    if (err.response) return toast.error(err.response.data.message);
    toast.error(err.message);
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
      if (err.response) return toast.error(err.response.data.message);
      toast.error(err.message);
    } finally {
      loading(false);
    }
  };
