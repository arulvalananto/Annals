import React from 'react';

const Label = ({ children, className }) => {
    return (
        <label className={`text-xs mb-1 text-gray-600 ${className}`}>
            {children}
        </label>
    );
};

export default React.memo(Label);
