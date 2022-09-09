import React from 'react';
import { useDispatch } from 'react-redux';
import { Settings, ExitToApp } from '@mui/icons-material';

import './index.css';
import ActiveLink from '../ActiveLink';
import { ROUTES } from '../../utils/routes';
import logo from '../../assets/logo-title.png';
import menuItems from '../../data/DashboardDrawerItems';
import { logout } from '../../store/actions/auth.actions';

const Sidebar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => dispatch(logout());

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <img src={logo} alt="Annals Logo" className="logo" />
                <div className="link">
                    {menuItems.map(({ to, Icon, title }) => (
                        <ActiveLink
                            to={to}
                            Icon={Icon}
                            title={title}
                            key={to}
                        />
                    ))}
                </div>
                <div className="link">
                    <ActiveLink
                        to={ROUTES.SETTINGS}
                        title="Settings"
                        Icon={Settings}
                    />
                    <button
                        type="button"
                        className="logout"
                        onClick={handleLogout}
                    >
                        <p className="logout-icon">
                            <ExitToApp size={16} className="mr-3" />
                            <span>Log out</span>
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Sidebar);
