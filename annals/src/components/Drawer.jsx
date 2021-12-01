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

const Drawer = ({
  Icon,
  children,
  fontSize = "16px",
  className = "",
  submit = false,
  onSubmit = () => {},
}) => {
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

  const handleSubmit = () => {
    onSubmit();
    toggleDrawer();
  };

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
        {submit && (
          <button
            className="px-4 py-2 text-lg bg-primary rounded mx-4"
            onClick={handleSubmit}
          >
            Update
          </button>
        )}
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
