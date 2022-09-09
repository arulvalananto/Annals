import React from 'react';

const Modal = ({ children, onClose, visible = false }) => {
    if (!visible) return null;

    const visibility = visible ? 'translate-x-0' : 'translate-x-96';

    return (
        <React.Fragment>
            <div className="modal-container" onClick={onClose}></div>
            <div className={`modal ${visibility}`}>{children}</div>
        </React.Fragment>
    );
};

export default React.memo(Modal);
