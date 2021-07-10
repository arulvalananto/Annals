import React from "react";
import "./Sidebar.style.scss";
// React Icons
import { RiHome2Line, RiTodoLine, RiSettings4Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { IoLockOpenOutline, IoBulbOutline, IoRepeat } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { BiNote, BiBookOpen } from "react-icons/bi";
// Material UI
import { Tooltip } from "@material-ui/core";
import ActiveLink from "../ActiveLink/ActiveLink.component";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <ActiveLink to="/settings" title="Settings" Icon={RiSettings4Line} />
            </div>
            <div className="sidebar__middle">
                <ActiveLink to="/" title="Home" Icon={RiHome2Line} />
                <ActiveLink to="/diary" title="Diary" Icon={BiBookOpen} />
                <ActiveLink
                    to="/password-safe"
                    title="Password Safe"
                    Icon={IoLockOpenOutline}
                />
                <ActiveLink to="/routines" title="Routines" Icon={IoRepeat} />
                <ActiveLink to="/ideas" title="Ideas" Icon={IoBulbOutline} />
                <ActiveLink
                    to="/todo-list"
                    title="Todo List"
                    Icon={RiTodoLine}
                />
                <ActiveLink to="/notes" title="Notes" Icon={BiNote} />
                <ActiveLink
                    to="/personal-info"
                    title="Personal Info"
                    Icon={BsPerson}
                />
            </div>
            <div className="sidebar__bottom">
                <Tooltip title="Logout" placement="right" arrow>
                    <a
                        className="sidebar__logo"
                        href="http://localhost:5000/api/v1/logout"
                    >
                        <FiLogOut size={20} />
                    </a>
                </Tooltip>
            </div>
        </div>
    );
};

export default Sidebar;
