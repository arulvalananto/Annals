import React, { useState } from "react";
import "./Header.style.scss";
// React Router
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClear } from "react-icons/md";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible && (
        <div className='header__overlay' onClick={toggleVisible}></div>
      )}
      <div className='header'>
        <div className='header__left'>
          <Link to='/'>
            <img src={logo} alt='logo' className='header__logo' />
          </Link>
        </div>
        <div className='header__right'>
          <Link to='/signin'>
            <button className='header__rightButton header__rightButton--primary'>
              Sign In
            </button>
          </Link>
          <Link to='/signup'>
            <button className='header__rightButton header__rightButton--secondary'>
              Sign Up
            </button>
          </Link>
        </div>
        <div className='header__right--collapse' onClick={toggleVisible}>
          <HiOutlineMenuAlt3 size={24} />
        </div>
        {visible && (
          <div className='header__rightMenu'>
            <MdClear
              size={20}
              className='header__rightMenu--clear'
              onClick={toggleVisible}
            />
            <ul className='header__rightMenuLists'>
              <Link to='/signin'>
                <li className='header__rightMenuList'>Sign In</li>
              </Link>
              <Link to='/signup'>
                <li className='header__rightMenuList'>Sign Up</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
