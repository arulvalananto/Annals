import React from "react";

const Label = ({ children }) => {
  return <label className="text-xs mb-1 text-gray-600">{children}</label>;
};

export default React.memo(Label);
