import React from 'react';
import { CircularProgress } from '@mui/material';

import './index.css';

const Button = ({ title, className = '', type, loading = false }) => {
    const style = loading ? `loading ${className}` : className;

    return (
        <button className={`button ${style}`} type={type} disabled={loading}>
            {loading ? <CircularProgress size="20px" color="inherit" /> : title}
        </button>
    );
};

export default React.memo(Button);
