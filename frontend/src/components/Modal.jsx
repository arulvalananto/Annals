import React from "react";

const Modal = ({ children, onClose, visible = false }) => {
  if (!visible) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen z-20"
        onClick={onClose}
      ></div>
      <div
        className={`fixed bottom-40 right-10 z-30 w-72 bg-bglight shadow p-4 rounded transform transition-all duration-150 ${
          visible ? "translate-x-0" : "translate-x-96"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default React.memo(Modal);
