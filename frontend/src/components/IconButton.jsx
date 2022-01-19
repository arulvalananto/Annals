import React from "react";

const IconButton = ({ Icon, color = "white", fontSize = "0.8rem" }) => {
  return (
    <div
      className={`transform hover:scale-110 hover:text-${color} cursor-pointer`}
    >
      <Icon fontSize={fontSize} />
    </div>
  );
};

export default React.memo(IconButton);
