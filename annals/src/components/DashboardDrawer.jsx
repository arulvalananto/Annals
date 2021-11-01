import React from "react";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

import Drawer from "../components/Drawer";
import menuItems from "../data/DashboardDrawerItems";

const DashboardDrawer = () => {
  return (
    <Drawer Icon={Menu}>
      <div className="px-5 p-3 flex flex-col w-64 font-poppins">
        {menuItems.map(({ to, Icon, title }) => (
          <Link to={to} className="p-5 font-bold flex items-center">
            <Icon />
            <p className="ml-3">{title}</p>
          </Link>
        ))}
      </div>
    </Drawer>
  );
};

export default DashboardDrawer;
