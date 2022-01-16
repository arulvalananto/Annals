import axios from "../../api/axios";
import { errResponse } from "../../utils/helpers";
import { FETCH_DASHBOARD } from "../reducers/common.reducer";

export const fetchDashboardData = (loading, setFocus) => async (dispatch) => {
  try {
    const response = await axios.get("/common/dashboard");
    dispatch(FETCH_DASHBOARD(response.data));

    setFocus(response.data.focus);
  } catch (error) {
    errResponse(error);
  } finally {
    loading(false);
  }
};
