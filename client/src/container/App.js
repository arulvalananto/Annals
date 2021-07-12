import React, { useEffect, useCallback, Suspense } from "react";
import "./App.css";
// React Router
import { BrowserRouter } from "react-router-dom";
// React Redux
import { useDispatch, useSelector } from "react-redux";
// Axios
import axios from "../axios";
// Other Components
import AppRoutes from "./AppRoutes.component";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage.component";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage.component";
import Spinner from "../components/Spinner/Spinner.component";
// Reducers
import { authFailed, fetchUser } from "../redux/reducers/auth.reducer";
import {
  requestPending,
  requestFailed,
  requestSucceed,
  selectLoading,
} from "../redux/reducers/request.reducer";
import {
  setFailureMessage,
  selectMessage,
} from "../redux/reducers/message.reducer";

function App() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const loading = useSelector((state) => selectLoading(state));
  const message = useSelector((state) => selectMessage(state));

  console.log(state);

  const fetchData = useCallback(async () => {
    try {
      dispatch(requestPending());
      const res = await axios.get("/api/v1/current-user");
      dispatch(requestSucceed());
      dispatch(fetchUser(res.data));
    } catch (err) {
      dispatch(requestFailed());
      dispatch(authFailed());
      dispatch(setFailureMessage(err.message));
    }
  }, []); // if you add 'history' to dependency, fectchData runs rapidly on landing page.

  useEffect(() => fetchData(), [fetchData]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='app'>
      {message.success && <SuccessMessage message={message.success} />}
      {message.failure && <ErrorMessage message={message.failure} />}
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
