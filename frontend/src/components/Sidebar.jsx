import React from 'react';
import { useDispatch } from 'react-redux';
import { Settings, ExitToApp } from '@mui/icons-material';

import { ROUTES } from '../utils/routes';
import logo from '../assets/logo-title.png';
import ActiveLink from '../components/ActiveLink';
import menuItems from '../data/DashboardDrawerItems';
import { logout } from '../store/actions/auth.actions';

const Sidebar = () => {
    const dispatch = useDispatch();

    return (
        <div className="hidden xl:block col-span-1 bg-bglight p-5 text-white sticky top-0 left-0 w-full h-screen">
            <div className="flex flex-col justify-between w-full h-full">
                <img
                    src={logo}
                    alt="Annals Logo"
                    className="w-24 h-20 object-contain select-none"
                />
                <div className="flex flex-col">
                    {menuItems.map(({ to, Icon, title }) => (
                        <ActiveLink
                            to={to}
                            Icon={Icon}
                            title={title}
                            key={to}
                        />
                    ))}
                </div>
                <div className="flex flex-col">
                    <ActiveLink
                        to={ROUTES.SETTINGS}
                        title="Settings"
                        Icon={Settings}
                    />
                    <button
                        type="button"
                        className="p-5 py-2 mb-2 rounded-md text-sm hover:bg-primary"
                        onClick={() => dispatch(logout())}
                    >
                        <p className="flex items-center select-none">
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
