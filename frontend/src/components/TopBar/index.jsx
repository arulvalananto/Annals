import React from 'react';

import './index.css';
import logo from '../../assets/logo-title.png';
import DashboardDrawer from '../DashboardDrawer';

const TopBar = () => {
    return (
        <div className="top-bar">
            <img src={logo} alt="Annals Logo" className="logo" />
            <div className="drawer">
                <DashboardDrawer />
            </div>
        </div>
    );
};

export default React.memo(TopBar);
