import React from "react";
import "./FormInput.css";

const FormInput = ({
    label,
    error,
    className,
    handleChange,
    ...otherProps
}) => {
    console.log(error);
    return (
        <div className="form-group">
            <input
                className={`${className} input ${error && "input-error"} `}
                onChange={(e) => handleChange(e.target)}
                {...otherProps}
            />
            <span className="error">{error}</span>
        </div>
    );
};

export default FormInput;
