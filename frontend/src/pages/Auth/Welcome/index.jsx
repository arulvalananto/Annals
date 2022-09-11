import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ArrowDownward, ArrowRightAlt } from '@mui/icons-material';

import logo from '../../assets/logo.png';
import Button from '../../../components/Button';
import Drawer from '../../../components/Drawer';
import { MESSAGES, ROUTES } from '../../../utils/constants';

const FEATURES = ['Tasks', 'Journals', 'Passwords', 'Ideas'];

const Landing = () => {
    return (
        <div className="container">
            <nav className="header">
                <Link to={ROUTES.WELCOME}>
                    <img src={logo} alt={MESSAGES.LOGO} className="logo" />
                </Link>
                <div className="link-wrapper">
                    <div className="link-container">
                        <Link to={ROUTES.SIGN_IN}>
                            <Button
                                title="Sign In"
                                type="button"
                                className="link"
                            />
                        </Link>
                        <Link to={ROUTES.SIGN_UP}>
                            <Button title="Sign Up" type="button" />
                        </Link>
                    </div>
                </div>
                <div className="drawer-container">
                    <Drawer Icon={Menu}>
                        <div className="drawer-links">
                            <Link to={ROUTES.SIGN_IN} className="p-5 font-bold">
                                Sign In <ArrowRightAlt />
                            </Link>
                            <Link to={ROUTES.SIGN_UP} className="p-5 font-bold">
                                Sign Up <ArrowRightAlt />
                            </Link>
                        </div>
                    </Drawer>
                </div>
            </nav>
            <main>
                <section className="hero-container" id="showcase">
                    <h1 className="title">Ensures</h1>
                    <p className="subtitle">Your Safety</p>
                </section>
                <div className="popup">
                    <ArrowDownward fontSize="large" className="popup-animate" />
                </div>
                <section id="features" className="features">
                    {FEATURES.map((feature) => (
                        <div className="feature-container">
                            <h1 className="feature-title">{feature}</h1>
                            <p className="description">{MESSAGES.SAMPLE}</p>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Landing;
