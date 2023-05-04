import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, Logout } from '@mui/icons-material';

import './index.css';
import Drawer from '../Drawer';
import { DRAWER_MENU_ITEMS } from '../../utils/constants';
import { logout } from '../../store/actions/auth.actions';

const DashboardDrawer = () => {
    const dispatch = useDispatch();

    return (
        <Drawer Icon={Menu}>
            <div className="drawer">
                {DRAWER_MENU_ITEMS.map(({ to, Icon, title }) => (
                    <Link key={to} to={to} className="drawer-link">
                        <Icon />
                        <p className="ml-3">{title}</p>
                    </Link>
                ))}
                <button
                    onClick={() => dispatch(logout())}
                    className="drawer-logout"
                >
                    <Logout />
                    <span className="ml-3">Logout</span>
                </button>
            </div>
        </Drawer>
    );
};

export default React.memo(DashboardDrawer);
