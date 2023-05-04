import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './index.css';
import Form from '../../../components/Form';
import {
    forgotPassword,
    resetPassword,
} from '../../../store/actions/auth.actions';
import Input from '../../../components/Input';
import { SCHEMA } from '../../../utils/forms';
import Button from '../../../components/Button';
import logo from '../../../assets/logo-title.png';
import { MESSAGES, ROUTES } from '../../../utils/constants';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleIsCodeSent = () => setIsCodeSent(!isCodeSent);

    const handleIsPasswordUpdated = () => setIsUpdated(!isUpdated);

    const handleForgotPassword = (values, { resetForm }) => {
        dispatch(forgotPassword(values, setLoading, handleIsCodeSent));
        resetForm();
    };

    const handelResetPassword = (values, { resetForm }) => {
        dispatch(resetPassword(values, setLoading, handleIsPasswordUpdated));
        resetForm();
    };

    return (
        <>
            <div className="bg-layer-1"></div>
            <div className="bg-layer-2"></div>
            <div className="bg-layer-3"></div>
            <div className="bg-layer-4"></div>
            <div className="w-screen lg:w-1/2 bg-opacity-90 shadow backdrop-blur-lg fixed top-0 left-0 h-screen z-50 text-white p-10 flex flex-col justify-center">
                <div>
                    <img
                        alt={MESSAGES.LOGO}
                        className="w-24 h-24 mb-10 object-contain"
                        src={logo}
                    />
                </div>
                {isUpdated ? (
                    <div>
                        <h2 className="text-4xl">
                            {MESSAGES.FORGOT_CHANGE_SUCCESS}
                        </h2>
                        <p className="text-darkgray text-sm mt-4">
                            <span>Redirect to</span>
                            <Link
                                className="text-secondary mx-1"
                                to={ROUTES.SIGN_IN}
                            >
                                Login
                            </Link>
                            ?
                        </p>
                    </div>
                ) : (
                    <>
                        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">
                            {isCodeSent
                                ? MESSAGES.CODE_REQUEST
                                : MESSAGES.FORGOT_PASSWORD}
                        </h1>
                        <p className="text-darkgray text-sm">
                            {isCodeSent ? (
                                MESSAGES.FORGOT_REQUEST_INFO
                            ) : (
                                <>
                                    <span>Want to go back?</span>
                                    <Link
                                        to={ROUTES.SIGN_IN}
                                        className="text-secondary text-lg ml-1"
                                    >
                                        Login
                                    </Link>{' '}
                                </>
                            )}
                        </p>
                        {!isCodeSent ? (
                            <Form
                                className="mt-10"
                                initialValues={{ email: '' }}
                                onSubmit={handleForgotPassword}
                                validationSchema={SCHEMA.FORGOT_PASSWORD}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter email address"
                                    name="email"
                                    className="border-2 border-darkgray text-black w-full focus:border-primary"
                                />
                                <Button
                                    type="submit"
                                    title="Submit"
                                    loading={loading}
                                    className="bg-primary text-white w-full p-3 mt-5"
                                />
                            </Form>
                        ) : (
                            <Form
                                className="mt-10"
                                initialValues={{
                                    code: '',
                                    password: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={SCHEMA.RESET_PASSWORD}
                                onSubmit={handelResetPassword}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter Verification Code"
                                    name="code"
                                    className="border-2 border-darkgray text-black w-full focus:border-primary"
                                />
                                <Input
                                    type="password"
                                    placeholder="Enter New Password"
                                    name="password"
                                    className="border-2 border-darkgray text-black w-full focus:border-primary"
                                />
                                <Input
                                    type="password"
                                    placeholder="Re-type New Password"
                                    name="confirmPassword"
                                    className="border-2 border-darkgray text-black w-full focus:border-primary"
                                />
                                <Button
                                    type="submit"
                                    title="Reset"
                                    loading={loading}
                                    className="bg-secondary text-white w-full p-3 mt-5"
                                />
                            </Form>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default ForgotPassword;
