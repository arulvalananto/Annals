import React from "react";

const IconButton = ({ Icon, color = "white" }) => {
  return (
    <div
      className={`transform hover:scale-110 hover:text-${color} cursor-pointer`}
    >
      <Icon fontSize="0.8rem" />
    </div>
  );
};

export default IconButton;
