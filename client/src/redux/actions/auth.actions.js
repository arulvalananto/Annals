import axios from "../../axios";
import {
  requestPending,
  requestSucceed,
  requestFailed,
  userFetched,
} from "../reducers/auth.reducer";
import { setFailureMessage } from "../reducers/message.reducer";

const auth = (url) => (credentials, loading, history) => async (dispatch) => {
  try {
    const response = await axios.post(url, credentials);
    dispatch(userFetched(response?.data));
    loading(false);
    history.replace("/");
  } catch (err) {
    dispatch(setFailureMessage(err.response?.data.message));
    loading(false);
  }
};

export const fetchUser = async (dispatch) => {
  try {
    dispatch(requestPending());
    const res = await axios.get("/current-user");
    dispatch(requestSucceed());
    dispatch(userFetched(res.data));
  } catch (err) {
    dispatch(requestFailed());
    dispatch(setFailureMessage(err.message));
  }
};
export const register = auth("/register");
export const login = auth("/login");
