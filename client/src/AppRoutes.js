import React from "react";
// React Redux
import { useSelector } from "react-redux";
//  React Router
import { Route } from "react-router";
// Other Components
import Dashboard from "./pages/Dashboard/Dashboard.component";
import SignIn from "./pages/SignIn/SignIn.component";
import SignUp from "./pages/SignUp/SignUp.component";
import Landing from "./pages/Landing/Landing.component";

const AppRoutes = () => {
  const user = useSelector((state) => state.auth);

  if (user.loggedIn) return <Route path="/" component={Dashboard} />;

  return (
    <>
      <Route exact path="/" component={Landing} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
    </>
  );
};

export default AppRoutes;
