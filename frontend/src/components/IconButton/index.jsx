import React from 'react';

const IconButton = ({ Icon, color, fontSize, onClick, className }) => {
    const hover = `hover:text-${color}`;

    return (
        <div className={`${hover} icon-button ${className}`} onClick={onClick}>
            <Icon fontSize={fontSize || '0.8rem'} />
        </div>
    );
};

export default React.memo(IconButton);
