import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import './index.css';
import IconButton from '../IconButton';
import ErrorMessage from '../ErrorMessage';

const Input = ({
    type,
    placeholder,
    name,
    className = '',
    iconColor = 'inherit',
    disabled = false,
}) => {
    const [show, setShow] = useState(false);
    const { errors, touched, values, handleChange, handleBlur } =
        useFormikContext();

    const condition = type === 'password';
    const style = `${errors[name] && touched[name] && 'error'} ${className}`;

    const changeType = () => type === 'password' && setShow(!show);

    return (
        <div className="">
            <label className="relative">
                <input
                    type={show ? 'text' : type}
                    placeholder={placeholder}
                    value={values[name]}
                    name={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input ${style} ${condition ? 'pr-10' : ''}`}
                    disabled={disabled}
                />
                {condition && (
                    <IconButton
                        Icon={show ? VisibilityOff : Visibility}
                        className={`icon text-${iconColor}`}
                        onClick={changeType}
                    />
                )}
            </label>
            <ErrorMessage visible={touched[name]} message={errors[name]} />
        </div>
    );
};

export default React.memo(Input);
