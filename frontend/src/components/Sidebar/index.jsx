import React from "react";
import { useDispatch } from "react-redux";
import { Settings, ExitToApp } from "@mui/icons-material";

import "./index.css";
import ActiveLink from "../ActiveLink";
import logo from "../../assets/logo.svg";
import { DRAWER_MENU_ITEMS } from "../../utils/constants";
import { MESSAGES, ROUTES } from "../../utils/constants";
import { logout } from "../../store/actions/auth.actions";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <img src={logo} alt={MESSAGES.LOGO} className="sidebar-logo" />
        <div className="sidebar-link">
          {DRAWER_MENU_ITEMS.map(({ to, Icon, title }) => (
            <ActiveLink to={to} Icon={Icon} title={title} key={to} />
          ))}
        </div>
        <div className="sidebar-link">
          <ActiveLink to={ROUTES.SETTINGS} title="Settings" Icon={Settings} />
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <p className="sidebar-logout-icon">
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
