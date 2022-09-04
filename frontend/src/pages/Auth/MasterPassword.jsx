import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'formik';
import { Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import Input from '../../components/Input';
import { ROUTES } from '../../utils/routes';
import Button from '../../components/Button';
import logo from '../../assets/logo-title.png';
import CustomForm from '../../components/Form';
import {
    createMasterPasswordSchema,
    verifyMasterPasswordSchema,
} from '../../utils/formSchema';
import {
    generateMasterPassword,
    logout,
    verifyMasterPassword,
} from '../../store/actions/auth.actions';

const MasterPassword = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { push } = useHistory();

    const [loading, setLoading] = useState(false);

    const handleCreate = async (values) => {
        dispatch(generateMasterPassword(values, setLoading, push));
    };

    const handleVerify = async (values) => {
        dispatch(verifyMasterPassword(values, setLoading, push));
    };

    const renderForm = useCallback(() => {
        if (!user.hasMasterPassword) {
            return (
                <CustomForm
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={createMasterPasswordSchema}
                    onSubmit={handleCreate}
                    className="p-2"
                >
                    <Form>
                        <Input
                            type="password"
                            name="password"
                            placeholder="master password"
                            className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-tertiary border-2 rounded focus:border-opacity-100 w-96 border-gray-700 text-white"
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
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
                </CustomForm>
            );
        } else {
            return (
                <CustomForm
                    initialValues={{ password: '' }}
                    validationSchema={verifyMasterPasswordSchema}
                    onSubmit={handleVerify}
                >
                    <Form>
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
                </CustomForm>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.hasMasterPassword, loading]);

    const handleLogout = () => {
        dispatch(logout());
        push(ROUTES.DEFAULT);
    };

    return (
        <div className="w-screen h-screen bg-mildgray  flex flex-col items-center justify-center relative">
            <img
                src={logo}
                alt="Annals logo"
                className="w-40 h-40 object-cover"
            />
            {renderForm()}
            <Tooltip title="Logout">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="absolute top-0 right-0 text-white rounded text-lg m-5 px-4 py-2 hover:text-danger"
                >
                    <LogoutIcon fontSize="large" />
                </button>
            </Tooltip>
        </div>
    );
};

export default MasterPassword;
