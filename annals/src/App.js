import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { getCurrentUser } from "./store/actions/user.actions";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RouteLock from "./RouteLock";
import Alerter from "./components/Alerter";
import Loading from "./components/Loading";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleLoading = (val) => setLoading(val);
  const handleError = (message) => setError(message);

  useEffect(() => {
    dispatch(getCurrentUser(handleLoading, handleError));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Alerter visible={error} message={error} handleError={handleError} />
      <RouteLock
        path="/sign-in"
        component={SignIn}
        redirectTo="/"
        condition={user}
      />
      <RouteLock
        path="/sign-up"
        component={SignUp}
        redirectTo="/"
        condition={user}
      />
      <RouteLock
        path="/forgot-password"
        component={ForgotPassword}
        redirectTo="/"
        condition={user}
      />
      <RouteLock
        path="/welcome"
        exact
        component={Landing}
        redirectTo="/"
        condition={user}
      />
      <RouteLock
        path="/"
        component={Dashboard}
        redirectTo="/welcome"
        condition={!user}
      />
    </BrowserRouter>
  );
}

export default App;
