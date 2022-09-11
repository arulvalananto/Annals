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
        <div className="master-password">
            <img src={logo} alt={MESSAGES.LOGO} className="logo" />
            {!user.hasMasterPassword ? (
                <Form
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={SCHEMA.CREATE_MASTER_PASSWORD}
                    onSubmit={handleCreate}
                    className="p-2"
                >
                    <Input
                        type="password"
                        name="password"
                        placeholder="master password"
                        className="input"
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm master password"
                        className="input"
                    />
                    <Button
                        title="Submit"
                        type="submit"
                        className="button"
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
                        className="input-secondary"
                    />
                    <Button
                        title="Submit"
                        type="submit"
                        className="button-secondary"
                        loading={loading}
                    />
                </Form>
            )}
            <Tooltip title="Logout">
                <button type="button" onClick={handleLogout} className="logout">
                    <LogoutIcon fontSize="large" />
                </button>
            </Tooltip>
        </div>
    );
};

export default MasterPassword;
