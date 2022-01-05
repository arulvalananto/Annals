import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { getCurrentUser } from "./store/actions/auth.actions";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Alerter from "./components/Alerter";
import Loading from "./components/Loading";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLoading = (val) => setLoading(val);
  const handleError = (message) => setError(message);

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(getCurrentUser(handleLoading));
    else handleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <Alerter visible={error} message={error} handleError={handleError} />
      <PublicRoute
        restricted={false}
        path="/forgot-password"
        component={ForgotPassword}
      />
      <PublicRoute
        restricted={isLoggedIn}
        path="/welcome"
        component={Welcome}
      />
      <PublicRoute restricted={isLoggedIn} path="/sign-in" component={SignIn} />
      <PublicRoute restricted={isLoggedIn} path="/sign-up" component={SignUp} />
      <PrivateRoute path="/" component={Dashboard} />
    </BrowserRouter>
  );
}

export default App;
