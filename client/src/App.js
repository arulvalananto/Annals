import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
// React Router
import { BrowserRouter, useHistory } from "react-router-dom";
// React Redux
import { useDispatch, useSelector } from "react-redux";
// Axios
import axios from "./axios";

import AppRoutes from "./AppRoutes";
// Other Components
import SuccessMessage from "./components/SuccessMessage/SuccessMessage.component";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.component";
// Reducers
import { fetchUser } from "./redux/reducers/auth.reducer";
import { setFailureMessage } from "./redux/reducers/message.reducer";

function App() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const message = useSelector((state) => state.message);

  const fetchData = useCallback(async () => {
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
      dispatch(setFailureMessage(err.message));
      setLoading(false);
    }
  }, [dispatch]); // if you add 'history' to dependency, fectchData runs rapidly on landing page.

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
