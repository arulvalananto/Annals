import React from "react";
import "./ErrorMessage.scss";

import { VscError } from "react-icons/vsc";
import { MdClear } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearFailureMessage } from "../../redux/reducers/messageSlice";

const ErrorMessage = ({ message }) => {
  const dispatch = useDispatch();

  return (
    <div className="errorMessage">
      <div className="container">
        <p className="logo">
          <VscError size={24} />
        </p>
        <span className="message">{message}</span>
        <p className="clear" onClick={() => dispatch(clearFailureMessage())}>
          <MdClear size={10} />
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
