import React from 'react';

import './index.css';

const Label = ({ children, className }) => {
    return <label className={`label ${className}`}>{children}</label>;
};

export default React.memo(Label);
