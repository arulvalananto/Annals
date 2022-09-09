import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, Logout } from '@mui/icons-material';

import './index.css';
import Drawer from '../Drawer';
import menuItems from '../../data/DashboardDrawerItems';
import { logout } from '../../store/actions/auth.actions';

const DashboardDrawer = () => {
    const dispatch = useDispatch();

    return (
        <Drawer Icon={Menu}>
            <div className="drawer">
                {menuItems.map(({ to, Icon, title }) => (
                    <Link key={to} to={to} className="drawer-link">
                        <Icon />
                        <p className="ml-3">{title}</p>
                    </Link>
                ))}
                <button onClick={() => dispatch(logout())} className="logout">
                    <Logout />
                    <span className="ml-3">Logout</span>
                </button>
            </div>
        </Drawer>
    );
};

export default React.memo(DashboardDrawer);
