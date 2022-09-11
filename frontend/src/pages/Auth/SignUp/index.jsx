import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Form from '../../../components/Form';
import { SCHEMA } from '../../../utils/forms';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import cover from '../../assets/signup_cover.gif';
import { MESSAGES, ROUTES } from '../../../utils/constants';
import { register } from '../../../store/actions/auth.actions';

const SignUp = () => {
    const { push } = useHistory();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) =>
        dispatch(register(values, setLoading, push));

    return (
        <div className="container">
            <div className="left">
                <div className="image-container">
                    <img src={cover} alt={MESSAGES.LOGO} className="logo" />
                </div>
                <h3 className="description">{MESSAGES.SIGNUP.DESCRIPTION}</h3>
            </div>
            <div className="right">
                <nav className="header">
                    <span className="mr-5">Have an account?</span>
                    <Link to={ROUTES.SIGN_IN}>
                        <Button title="Sign In" className="link" />
                    </Link>
                </nav>
                <div className="mt-10 sm:mt-20">
                    <h1 className="title">{MESSAGES.SIGNUP.TITLE}</h1>
                    <p className="subtitle">{MESSAGES.SIGNUP.SUBTITLE}</p>
                    <div className="form-container">
                        <Form
                            initialValues={{
                                fullName: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={SCHEMA.SIGN_UP}
                            onSubmit={handleSubmit}
                        >
                            <Input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                className="input"
                            />
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
                            />
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="input"
                            />
                            <Button
                                type="submit"
                                title="Let's Create"
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

export default SignUp;
