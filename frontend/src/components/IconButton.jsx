import React from 'react';

const IconButton = ({
    Icon,
    color = 'white',
    fontSize = '0.8rem',
    onClick,
    className,
}) => {
    return (
        <div
            className={`flex items-center justify-center transform hover:scale-110 hover:text-${color} cursor-pointer ${className}`}
            onClick={onClick}
        >
            <Icon fontSize={fontSize} />
        </div>
    );
};

export default React.memo(IconButton);
