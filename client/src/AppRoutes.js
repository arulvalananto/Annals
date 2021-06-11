import React from "react";
// React Redux
import { useSelector } from "react-redux";
//  React Router
import { Route } from "react-router";
// Other Components
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Landing from "./pages/Landing/Landing";

const AppRoutes = () => {
    const user = useSelector((state) => state.auth.userData);

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
