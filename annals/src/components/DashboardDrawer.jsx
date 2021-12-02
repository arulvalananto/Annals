import React from "react";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

import Drawer from "../components/Drawer";
import menuItems from "../data/DashboardDrawerItems";
import { logout } from "../store/actions/auth.actions";

const DashboardDrawer = () => {
  const dispatch = useDispatch();

  return (
    <Drawer Icon={Menu}>
      <div className="px-5 p-3 flex flex-col w-64 font-poppins">
        {menuItems.map(({ to, Icon, title }) => (
          <Link key={to} to={to} className="p-5 font-bold flex items-center">
            <Icon />
            <p className="ml-3">{title}</p>
          </Link>
        ))}
        <button
          onClick={() => dispatch(logout())}
          className="p-5 font-bold flex items-center"
        >
          <LogoutIcon />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </Drawer>
  );
};

export default DashboardDrawer;
