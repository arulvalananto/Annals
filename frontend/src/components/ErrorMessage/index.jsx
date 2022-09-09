import React from 'react';

import './index.css';

const ErrorMessage = ({ visible, message }) => {
    if (!visible || !message) return null;

    return <label className="error-message">{message}</label>;
};

export default React.memo(ErrorMessage);
