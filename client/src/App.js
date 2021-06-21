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

function App() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const state = useSelector((state) => state);
  console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
