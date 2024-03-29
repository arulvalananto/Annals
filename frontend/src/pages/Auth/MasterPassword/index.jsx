import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { SCHEMA } from '../../../utils/forms';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import logo from '../../../assets/logo-title.png';
import { MESSAGES, ROUTES } from '../../../utils/constants';
import Form from '../../../components/Form';
import {
    generateMasterPassword,
    logout,
    verifyMasterPassword,
} from '../../../store/actions/auth.actions';

const MasterPassword = () => {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const handleCreate = async (values) =>
        dispatch(generateMasterPassword(values, setLoading, push));

    const handleVerify = async (values) =>
        dispatch(verifyMasterPassword(values, setLoading, push));

    const handleLogout = () => {
        dispatch(logout());
        push(ROUTES.DEFAULT);
    };

    return (
        <div className="w-screen h-screen bg-mildgray flex flex-col items-center justify-center relative">
            <img
                src={logo}
                alt={MESSAGES.LOGO}
                className="w-40 h-40 object-cover"
            />
            {!user?.hasMasterPassword ? (
                <Form
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={SCHEMA.CREATE_MASTER_PASSWORD}
                    onSubmit={handleCreate}
                    className="p-2"
                >
                    <Input
                        type="password"
                        name="password"
                        iconColor="white"
                        placeholder="master password"
                        className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-tertiary border-2 rounded focus:border-opacity-100 w-96 border-gray-700 text-white"
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        iconColor="white"
                        placeholder="confirm master password"
                        className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-tertiary border-2 rounded focus:border-opacity-100 w-96 border-gray-700 text-white"
                    />
                    <Button
                        title="Submit"
                        type="submit"
                        className="bg-tertiary w-full sm:w-96"
                        loading={loading}
                    />
                </Form>
            ) : (
                <Form
                    initialValues={{ password: '' }}
                    validationSchema={SCHEMA.VERIFY_MASTER_PASSWORD}
                    onSubmit={handleVerify}
                >
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter your master password"
                        iconColor="white"
                        className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-secondary border-2 rounded focus:border-opacity-100 w-96 border-gray-700 text-white"
                    />
                    <Button
                        title="Submit"
                        type="submit"
                        className="bg-secondary w-full sm:w-96"
                        loading={loading}
                    />
                </Form>
            )}
            <Tooltip title="Logout">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="absolute top-0 right-0 text-white rounded text-lg m-5 px-4 py-2 hover:text-danger bg-transparent"
                >
                    <LogoutIcon fontSize="large" />
                </button>
            </Tooltip>
        </div>
    );
};

export default MasterPassword;
