import React from "react";
import { IconButton, SwipeableDrawer } from "@mui/material";
import { Clear } from "@mui/icons-material";

const Drawer = ({ Icon, children }) => {
  const [anchor, setAnchor] = React.useState(false);

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAnchor(!anchor);
  };

  return (
    <div>
      <button type="button" onClick={toggleDrawer}>
        <Icon />
      </button>
      <SwipeableDrawer
        anchor="right"
        open={anchor}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <button
          type="button"
          className="px-5 p-2 shadow-sm"
          onClick={toggleDrawer}
        >
          <IconButton>
            <Clear />
          </IconButton>
        </button>
        <>{children}</>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
