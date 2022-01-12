import React from "react";
import { Settings, ExitToApp } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import ActiveLink from "../components/ActiveLink";
import { logout } from "../store/actions/auth.actions";
import menuItems from "../data/DashboardDrawerItems";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logout());

  return (
    <div className="hidden xl:block col-span-1 bg-bglight p-5 text-white sticky top-0 left-0 w-full h-screen">
      <div className="flex flex-col justify-between w-full h-full">
        <ActiveLink to="/settings" title="Settings" Icon={Settings} />
        <div className="flex flex-col">
          {menuItems.map(({ to, Icon, title }) => (
            <ActiveLink to={to} Icon={Icon} title={title} key={to} />
          ))}
        </div>
        <button
          type="button"
          className="p-5 py-2 mb-2 rounded-md text-sm hover:bg-primary"
          onClick={handleLogOut}
        >
          <p className="flex items-center select-none">
            <ExitToApp size={16} className="mr-3" />
            <span>Log out</span>
          </p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
