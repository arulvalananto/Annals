import React from "react";
// React Redux
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/reducers/auth.reducer";
//  React Router
import { Route } from "react-router";
// Other Components
import Dashboard from "../pages/Dashboard/Dashboard.component";
const SignIn = React.lazy(() => import("../pages/SignIn/SignIn.component"));
const SignUp = React.lazy(() => import("../pages/SignUp/SignUp.component"));
const Landing = React.lazy(() => import("../pages/Landing/Landing.component"));

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => selectIsLoggedIn(state));

  if (isLoggedIn) return <Route path='/' component={Dashboard} />;

  return (
    <>
      <Route exact path='/' component={Landing} />
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
    </>
  );
};

export default AppRoutes;
