import React from "react";
import "./Sidebar.style.scss";
// React Icons
import { RiHome2Line, RiTodoLine, RiSettings4Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { IoLockOpenOutline, IoBulbOutline } from "react-icons/io5";
import { BsPerson, BsAlarm } from "react-icons/bs";
import { BiNote, BiBookOpen } from "react-icons/bi";
// Other Components
import ActiveLink from "../ActiveLink/ActiveLink.component";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ActiveLink to='/settings' title='Settings' Icon={RiSettings4Line} />
      </div>
      <div className='sidebar__middle'>
        <ActiveLink to='/' title='Dashboard' Icon={RiHome2Line} />
        <ActiveLink to='/diary' title='Diary' Icon={BiBookOpen} />
        <ActiveLink
          to='/passwords'
          title='Passwords'
          Icon={IoLockOpenOutline}
        />
        <ActiveLink to='/reminders' title='Reminders' Icon={BsAlarm} />
        <ActiveLink to='/ideas' title='Ideas' Icon={IoBulbOutline} />
        <ActiveLink to='/todos' title='Todo List' Icon={RiTodoLine} />
        <ActiveLink to='/notes' title='Notes' Icon={BiNote} />
        <ActiveLink to='/personal' title='Personal' Icon={BsPerson} />
      </div>
      <div className='sidebar__bottom'>
        <a className='sidebar__link' href='http://localhost:5000/api/v1/logout'>
          <p className='sidebar__logoContainer'>
            <FiLogOut size={20} className='sidebar__logo' />
            <span>Log out</span>
          </p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
