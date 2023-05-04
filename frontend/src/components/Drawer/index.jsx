import React from 'react';
import { Clear } from '@mui/icons-material';
import { SwipeableDrawer } from '@mui/material';

import './index.css';
import { drawerStyles } from '../../utils/styles';

const Drawer = (props) => {
    const { Icon, children, fontSize, className, onSubmit } = props;
    const [anchor, setAnchor] = React.useState(false);
    const classes = drawerStyles();

    const toggleDrawer = (event) => {
        const { type, key } = event;
        if (event && type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
            return;
        }

        setAnchor(!anchor);
    };

    const handleSubmit = () => {
        onSubmit();
        toggleDrawer();
    };

    return (
        <div className={`${className}`}>
            <button type="button" onClick={toggleDrawer}>
                <Icon color="inherit" fontSize={fontSize || '16px'} />
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
                    className="drawer-cancel-button"
                    onClick={toggleDrawer}
                >
                    <Clear />
                </button>
                <>{children}</>
                {onSubmit && (
                    <button
                        className="drawer-update-button"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                )}
            </SwipeableDrawer>
        </div>
    );
};

export default React.memo(Drawer);
