import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ArrowDownward, ArrowRightAlt } from '@mui/icons-material';

import logo from '../../assets/logo.png';
import { ROUTES } from '../../utils/routes';
import Button from '../../components/Button';
import Drawer from '../../components/Drawer';
import { MESSAGES } from '../../utils/constants';

const Landing = () => {
    return (
        <div className="mt-0 px-10 lg:px-40 font-poppins bg-white select-none">
            <nav className="flex justify-between items-center px-3 sm:p-0 pt-5">
                <Link to={ROUTES.WELCOME}>
                    <img
                        src={logo}
                        alt="Annals Logo"
                        className="w-14 h-14 object-contain"
                    />
                </Link>
                <div className="lg:block hidden">
                    <div className="flex items-center justify-center  ">
                        <Link to={ROUTES.SIGN_IN}>
                            <Button
                                title="Sign In"
                                type="button"
                                className="bg-primary mr-4 text-white"
                            />
                        </Link>
                        <Link to={ROUTES.SIGN_UP}>
                            <Button title="Sign Up" type="button" />
                        </Link>
                    </div>
                </div>
                <div className="p-2 shadow rounded hover:opacity-90 block lg:hidden">
                    <Drawer Icon={Menu}>
                        <div className="p-3 flex flex-col w-48 font-poppins">
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
                <section
                    className="mt-40 mb-20 font-bold text-center"
                    id="showcase"
                >
                    <h1 className="lg:text-6xl text-3xl text-tertiary mb-4">
                        Ensures
                    </h1>
                    <p className="lg:text-8xl text-6xl">Your Safety</p>
                </section>
                <div className="w-full text-center mt-40">
                    <ArrowDownward
                        fontSize="large"
                        className="animate-bounce w-6 h-6"
                    />
                </div>
                <section
                    id="features"
                    className="flex flex-col xl:flex-row items-center justify-between mt-80"
                >
                    <div className="xl:mr-4 mb-4">
                        <h1 className="font-bold text-2xl">Tasks</h1>
                        <p className="mt-3 break-all">
                            {MESSAGES.WELCOME.DESCRIPTION}
                        </p>
                    </div>
                    <div className="xl:mr-4 mb-4">
                        <h1 className="font-bold text-2xl">Journals</h1>
                        <p className="mt-3 break-all">
                            {MESSAGES.WELCOME.DESCRIPTION}
                        </p>
                    </div>
                    <div className="xl:mr-4 mb-4">
                        <h1 className="font-bold text-2xl">Passwords</h1>
                        <p className="mt-3 break-all">
                            {MESSAGES.WELCOME.DESCRIPTION}
                        </p>
                    </div>
                    <div className="xl:mr-4">
                        <h1 className="font-bold text-2xl">Ideas</h1>
                        <p className="mt-3 break-all">
                            {MESSAGES.WELCOME.DESCRIPTION}
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Landing;
