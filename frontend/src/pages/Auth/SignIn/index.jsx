import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Lock } from '@mui/icons-material';

import logo from '../../assets/logo.png';
import Form from '../../../components/Form';
import { SCHEMA } from '../../../utils/forms';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { MESSAGES, ROUTES } from '../../../utils/constants';
import { login } from '../../../store/actions/auth.actions';

const SignIn = () => {
    const { push } = useHistory();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) => dispatch(login(values, setLoading, push));

    return (
        <div className="container">
            <div className="left">
                <Link to={ROUTES.WELCOME}>
                    <img src={logo} alt={MESSAGES.LOGO} className="logo" />
                </Link>
            </div>
            <div className="right">
                <nav className="header">
                    <span className="mr-5">New User?</span>
                    <Link to={ROUTES.SIGN_UP}>
                        <Button title="Sign Up" className="link" />
                    </Link>
                </nav>
                <div className="mt-20">
                    <h1 className="title">Sign In</h1>
                    <p className="subtitle">Welcome back😍</p>
                    <div className="form-container">
                        <Form
                            initialValues={{ email: '', password: '' }}
                            validationSchema={SCHEMA.SIGN_IN}
                            onSubmit={handleSubmit}
                        >
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="input"
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input"
                                Icon={Lock}
                            />
                            <Link
                                to={ROUTES.FORGOT_PASSWORD}
                                className="forgot-link"
                            >
                                Forgot Password ?{' '}
                            </Link>
                            <Button
                                type="submit"
                                title="Sign In"
                                loading={loading}
                                className="button"
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
