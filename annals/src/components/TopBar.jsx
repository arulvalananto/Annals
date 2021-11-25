import React from "react";

import logo from "../assets/logo-2.png";
import DashboardDrawer from "../components/DashboardDrawer";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between xl:justify-around px-4">
      <img
        src={logo}
        alt="Annals Logo"
        className="w-24 h-20 object-contain select-none"
      />
      <div className="shadow rounded block xl:hidden p-2 border-gray">
        <DashboardDrawer />
      </div>
    </div>
  );
};

export default TopBar;
