import React from 'react';

import './index.css';
import logo from '../../assets/logo-title.png';
import { MESSAGES } from '../../utils/constants';
import DashboardDrawer from '../DashboardDrawer';

const TopBar = () => {
    return (
        <div className="top-bar">
            <img src={logo} alt={MESSAGES.LOGO} className="top-bar-logo" />
            <div className="top-bar-drawer">
                <DashboardDrawer />
            </div>
        </div>
    );
};

export default React.memo(TopBar);
