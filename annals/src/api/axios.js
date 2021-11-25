import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
  timeoutErrorMessage: "Server Down",
});

export default instance;

export const token = localStorage.getItem("token");
export const axiosConfig = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};