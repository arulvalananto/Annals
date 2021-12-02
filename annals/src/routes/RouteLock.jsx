import React from "react";
import { Redirect, Route } from "react-router";

const RouteLock = ({ path, component, redirectTo, condition }) => {
  if (condition) return <Redirect to={redirectTo} />;

  return <Route path={path} component={component} />;
};

export default RouteLock;
