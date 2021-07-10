import React from "react";
import "./SuccessMessage.style.scss";

import { BsCheckCircle } from "react-icons/bs";

const SuccessMessage = ({ message }) => {
  return (
    <div className="successMessage">
      <div className="container">
        <p className="logo">
          <BsCheckCircle size={24} />
        </p>
        <span className="message">{message}</span>
      </div>
    </div>
  );
};

export default SuccessMessage;
