import React from "react";
import { IconButton, SwipeableDrawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";

const useStyles = makeStyles({
  paper: {
    background: "#1d1c1c",
    color: "#fff",
  },
});

const Drawer = ({ Icon, children, fontSize = "16px", className = "" }) => {
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

  const classes = useStyles();

  return (
    <div className={`${className}`}>
      <button type="button" onClick={toggleDrawer}>
        <Icon color="inherit" fontSize={fontSize} />
      </button>
      <SwipeableDrawer
        classes={{ paper: classes.paper }}
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
