import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // "https://infinite-sands-32683.herokuapp.com/api/v1/" ||
  withCredentials: true,
  timeout: 10000,
  timeoutErrorMessage: "Server Down",
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;