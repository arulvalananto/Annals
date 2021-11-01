import React from "react";
import { Redirect, Route } from "react-router";

const RouteLock = ({
  path,
  component,
  exact = false,
  redirectTo,
  condition,
}) => {
  if (condition) return <Redirect to={redirectTo} />;

  return <Route path={path} exact={exact} component={component} />;
};

export default RouteLock;
