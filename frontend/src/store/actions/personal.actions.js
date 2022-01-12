import axios from "../../api/axios";
import { FETCH_PERSONAL_DATA } from "../reducers/personal.reducer";
import { clearFailure, setFailure } from "./notification.actions";

export const fetchPersonalData = (handleLoading) => async (dispatch) => {
  try {
    dispatch(clearFailure());

    const response = await axios.get("/personal");
    dispatch(FETCH_PERSONAL_DATA(response.data));
  } catch (err) {
    if (err.response) return dispatch(setFailure(err.response.data.message));

    dispatch(setFailure(err.message));
  } finally {
    handleLoading(false);
  }
};
