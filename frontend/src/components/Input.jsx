import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "./IconButton";

const Input = ({
  type,
  placeholder,
  name,
  className,
  Icon,
  iconColor = "inherit",
  disabled = false,
}) => {
  const { errors, touched, values, handleChange, handleBlur } =
    useFormikContext();

  const [inputType, setInputType] = useState(type);

  const style =
    errors[name] && touched[name]
      ? `border-2 border-red-500 shake ${className}`
      : className;

  const condition = type === "password";

  const changeType = () =>
    setInputType((current) => (current === "password" ? "text" : "password"));

  return (
    <div className="mb-5 flex flex-col">
      <label className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={values[name]}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`p-3 rounded outline-none invalid:border-red-500 disabled:cursor-not-allowed disabled:bg-gray-900 ${style} ${
            condition ? "pr-10" : ""
          }`}
          disabled={disabled}
        />
        {condition && (
          <IconButton
            Icon={inputType === "password" ? VisibilityOff : Visibility}
            className={`absolute top-1/2 object-contain right-4 transform -translate-x-1/2 -translate-y-1/2 text-${iconColor}`}
            onClick={changeType}
          />
        )}
      </label>
      <ErrorMessage visible={touched[name]} message={errors[name]} />
    </div>
  );
};

export default React.memo(Input);
