import React from 'react';

const ErrorMessage = ({ visible, message }) => {
    if (!visible || !message) return null;

    return <label className="text-xs text-danger">{message}</label>;
};

export default React.memo(ErrorMessage);
