import React from "react";
import "./Header.style.scss";
// React Router
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="header__left">
                <Link to="/">
                    <p className="header__logo">_Annals</p>
                </Link>
            </div>
            <div className="header__right">
                <Link to="/signup">
                    <button className="header__signupButton">Sign Up</button>
                </Link>
                <Link to="/signin">
                    <button className="header__signinButton">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
