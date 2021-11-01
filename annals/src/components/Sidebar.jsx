import React from "react";
import {
  Settings,
  Home as HomeIcon,
  ImportContacts,
  Lock,
  WbIncandescent,
  Task,
  ExitToApp,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";

import ActiveLink from "../components/ActiveLink";
import { logout } from "../redux/actions/user.actions";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logout());

  return (
    <div className="hidden xl:block col-span-1 bg-bglight p-5 text-white sticky top-0 left-0 w-full h-screen">
      <div className="flex flex-col justify-between w-full h-full">
        <ActiveLink to="/settings" title="Settings" Icon={Settings} />
        <div className="flex flex-col">
          <ActiveLink to="/" title="Dashboard" Icon={HomeIcon} />
          <ActiveLink to="/journals" title="Journals" Icon={ImportContacts} />
          <ActiveLink to="/passwords" title="Passwords" Icon={Lock} />
          <ActiveLink to="/ideas" title="Ideas" Icon={WbIncandescent} />
          <ActiveLink to="/tasks" title="Tasks" Icon={Task} />
        </div>
        <div
          className="p-5 py-2 mb-2 rounded-md text-sm hover:bg-primary"
          onClick={handleLogOut}
        >
          <p className="flex items-center">
            <ExitToApp size={16} className="mr-3" />
            <span>Log out</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
