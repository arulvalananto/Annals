import React from "react";
import "./FormInput.scss";

const FormInput = ({
  label,
  error,
  className,
  handleChange,
  ...otherProps
}) => {
  return (
    <div className="formInput">
      <input
        className={`${className} formInput--field ${
          error && "formInput--fieldError"
        } `}
        onChange={(e) => handleChange(e.target)}
        {...otherProps}
      />
      <span className="formInput__inputErrorMessage">{error}</span>
    </div>
  );
};

export default FormInput;
