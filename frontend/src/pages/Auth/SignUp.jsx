import React, { useState } from 'react';
import { Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomForm from '../../components/Form';
import cover from '../../assets/signup_cover.gif';
import { signUpSchema } from '../../utils/formSchema';
import { register } from '../../store/actions/auth.actions';
import { MESSAGES } from '../../utils/constants';
import { ROUTES } from '../../utils/routes';

const SignUp = () => {
    const dispatch = useDispatch();
    const { push } = useHistory();

    const [loading, setLoading] = useState(false);

    const handleLoading = (val) => setLoading(val);

    const handleSubmit = (values) =>
        dispatch(register(values, handleLoading, push));

    return (
        <div className="grid grid-cols-6 w-screen h-screen font-poppins select-none">
            <div className="hidden w-full h-full xl:block col-span-2 bg-primary p-5 items-center justify-center flex-col">
                <div className="flex items-center justify-center mt-20">
                    <img
                        src={cover}
                        alt="Annals Logo"
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
                        Sign Up
                    </h1>
                    <p className="text-center text-xl">
                        {MESSAGES.SIGNUP.TITLE}
                    </p>
                    <div className="sm:w-3/4 m-auto mt-10">
                        <CustomForm
                            initialValues={{
                                fullName: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={signUpSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="border-2 border-darkgray bg-gray focus:border-primary w-full"
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="border-2 border-darkgray bg-gray focus:border-primary w-full"
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="border-2 border-darkgray bg-gray focus:border-primary w-full"
                                />
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="border-2 border-darkgray bg-gray focus:border-primary w-full"
                                />
                                <Button
                                    type="submit"
                                    title="Let's Create"
                                    loading={loading}
                                    className="bg-primary text-white w-full p-3"
                                />
                            </Form>
                        </CustomForm>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
