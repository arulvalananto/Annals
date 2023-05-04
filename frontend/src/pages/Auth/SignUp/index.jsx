import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Form from '../../../components/Form';
import { SCHEMA } from '../../../utils/forms';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import cover from '../../../assets/signup_cover.gif';
import { MESSAGES, ROUTES } from '../../../utils/constants';
import { register } from '../../../store/actions/auth.actions';

const SignUp = () => {
    const { push } = useHistory();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) =>
        dispatch(register(values, setLoading, push));

    return (
        <div className="grid grid-cols-6 w-screen h-screen font-poppins select-none">
            <div className="hidden w-full h-full xl:block col-span-2 bg-primary p-5 items-center justify-center flex-col">
                <div className="flex items-center justify-center mt-20">
                    <img
                        src={cover}
                        alt={MESSAGES.LOGO}
                        className="w-72 h-72 object-contain"
                    />
                </div>
                <h3 className="text-3xl mt-10 text-white font-bold font-rampart w-5/6 m-auto">
                    {MESSAGES.SIGNUP.DESCRIPTION}
                </h3>
            </div>
            <div className="col-span-6 xl:col-span-4 bg-white p-3 sm:p-10 w-full h-screen overflow-auto">
                <nav className="w-full flex items-center justify-end">
                    <span className="mr-5">Have an account?</span>
                    <Link to={ROUTES.SIGN_IN}>
                        <Button
                            title="Sign In"
                            className="bg-secondary text-white"
                        />
                    </Link>
                </nav>
                <div className="mt-10 sm:mt-20">
                    <h1 className="text-4xl font-bold text-center mb-2 uppercase">
                        {MESSAGES.SIGNUP.TITLE}
                    </h1>
                    <p className="text-center text-xl">
                        {MESSAGES.SIGNUP.SUBTITLE}
                    </p>
                    <div className="sm:w-3/4 m-auto mt-10">
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
                                className="border-2 border-darkgray bg-gray-50 focus:border-primary w-full"
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="border-2 border-darkgray bg-gray-50 focus:border-primary w-full"
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="border-2 border-darkgray bg-gray-50 focus:border-primary w-full"
                            />
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="border-2 border-darkgray bg-gray-50 focus:border-primary w-full"
                            />
                            <Button
                                type="submit"
                                title="Let's Create"
                                loading={loading}
                                className="bg-primary text-white w-full p-3"
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
