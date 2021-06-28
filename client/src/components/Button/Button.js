import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./Button.scss";

const Button = ({ children, className, inverted, loading, ...otherProps }) => {
  return (
    <button
      className={`button ${inverted && "inverted"} ${className}`}
      {...otherProps}
    >
      {loading ? <CircularProgress size="16px" color="inherit" /> : children}
    </button>
  );
};

export default Button;
