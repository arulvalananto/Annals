import React from "react";
import { Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  removeFailure,
  removeSuccess,
} from "../store/actions/notification.actions";

const Alerter = ({ message, visible, type }) => {
  const dispatch = useDispatch();

  const onClose = () => {
    if (type === "error") dispatch(removeFailure());
    else dispatch(removeSuccess());
  };

  if (!visible) return null;

  return (
    <Alert
      variant="filled"
      severity={type}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
        >
          <Close fontSize="inherit" />
        </IconButton>
      }
      className="fixed xl:bottom-5 bottom-2 left-1/2 transform -translate-x-1/2 w-64 sm:w-72"
    >
      {message}
    </Alert>
  );
};

export default Alerter;
