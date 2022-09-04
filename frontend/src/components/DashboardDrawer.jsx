import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, Logout } from '@mui/icons-material';

import Drawer from '../components/Drawer';
import menuItems from '../data/DashboardDrawerItems';
import { logout } from '../store/actions/auth.actions';

const DashboardDrawer = () => {
    const dispatch = useDispatch();

    return (
        <Drawer Icon={Menu}>
            <div className=" flex flex-col w-64 font-poppins">
                {menuItems.map(({ to, Icon, title }) => (
                    <Link
                        key={to}
                        to={to}
                        className="p-5 my-3 font-bold flex items-center border__hover"
                    >
                        <Icon />
                        <p className="ml-3">{title}</p>
                    </Link>
                ))}
                <button
                    onClick={() => dispatch(logout())}
                    className="p-5 font-bold flex items-center hover:bg-primary duration-200"
                >
                    <Logout />
                    <span className="ml-3">Logout</span>
                </button>
            </div>
        </Drawer>
    );
};

export default React.memo(DashboardDrawer);
