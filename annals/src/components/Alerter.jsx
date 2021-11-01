import React from "react";
import { Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const Alerter = ({ message, handleError, visible }) => {
  if (!visible) return null;

  return (
    <Alert
      variant="filled"
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => handleError()}
        >
          <Close fontSize="inherit" />
        </IconButton>
      }
      className="fixed xl:bottom-5 bottom-2 left-1/2 transform -translate-x-1/2"
    >
      {message}
    </Alert>
  );
};

export default Alerter;
