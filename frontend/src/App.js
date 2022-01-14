import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { getCurrentUser } from "./store/actions/auth.actions";
import InitialLoader from "./components/InitialLoader";
import Loader from "./components/Loader";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Auth/Welcome";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
const MasterPassword = React.lazy(() => import("./pages/Auth/MasterPassword"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ForgotPassword = React.lazy(() => import("./pages/Auth/ForgotPassword"));

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const state = useSelector((state) => state);
  console.log(state);

  const [loading, setLoading] = useState(true);

  const handleLoading = (val) => setLoading(val);

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(getCurrentUser(handleLoading));
    else handleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <InitialLoader />;

  return (
    <BrowserRouter>
      <Toaster />
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute
            restricted={isLoggedIn}
            path="/forgot-password"
            component={ForgotPassword}
          />
          <PublicRoute
            restricted={isLoggedIn}
            path="/welcome"
            component={Welcome}
          />
          <PublicRoute
            restricted={isLoggedIn}
            path="/sign-in"
            component={SignIn}
          />
          <PublicRoute
            restricted={isLoggedIn}
            path="/sign-up"
            component={SignUp}
          />
          <Route path="/master-password" component={MasterPassword} />
          <Route path="/404" component={NotFound} exact />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
