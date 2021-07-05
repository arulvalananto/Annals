import React, { useEffect, useState } from "react";
import "./App.css";
// React Router
import { BrowserRouter, useHistory } from "react-router-dom";
// React Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/reducers/authSlice";
// Axios
import axios from "./axios";

import AppRoutes from "./AppRoutes";

import SuccessMessage from "./components/SuccessMessage/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import {
  clearSuccessMesage,
  clearSuccessMessage,
  setFailureMessage,
  setSuccessMessage,
} from "./redux/reducers/messageSlice";

function App() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const state = useSelector((state) => state);
  console.log(state);

  const message = useSelector((state) => state.message);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/current-user");
        dispatch(fetchUser(response.data));
        if (response.data.loggedIn) {
          history.push("/");
        } else {
          history.push("/signin");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        dispatch(setFailureMessage(err.message));
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, history]);

  if (loading) {
    return (
      <div className="app__spinnerContainer">
        <div className="app__spinner"></div>
      </div>
    );
  }
  return (
    <div className="app">
      {message.success && <SuccessMessage message={message.success} />}
      {message.failure && <ErrorMessage message={message.failure} />}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
