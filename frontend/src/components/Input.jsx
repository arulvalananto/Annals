import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({ type, placeholder, name, className, Icon }) => {
  const { errors, touched, values, handleChange, handleBlur } =
    useFormikContext();

  const [inputType, setInputType] = useState(type);

  const style =
    errors[name] && touched[name]
      ? "border-danger shake"
      : className
      ? className
      : "";

  const condition = type === "password";

  const changeType = () =>
    setInputType((current) => (current === "password" ? "text" : "password"));

  return (
    <div className="mb-5 relative flex flex-col">
      <input
        type={inputType}
        placeholder={placeholder}
        value={values[name]}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`p-3 rounded border-2 outline-none ${style} text-black ${
          condition ? "pr-10" : ""
        }`}
      />
      {condition &&
        (inputType === "password" ? (
          <VisibilityOff
            className="absolute right-4 top-4"
            onClick={changeType}
          />
        ) : (
          <Visibility className="absolute right-4 top-4" onClick={changeType} />
        ))}
      <ErrorMessage visible={touched[name]} message={errors[name]} />
    </div>
  );
};

export default Input;
