import toast from 'react-hot-toast';

import axios from '../../api/axios';
import { errResponse } from '../../utils/helpers';
import {
    API_ENDPOINTS,
    TOKEN_NAME,
    VERIFICATION_TOKEN_NAME,
} from '../../api/constants';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../reducers/auth.reducer';
import { MESSAGES, ROUTES } from '../../utils/constants';

export const register =
    (credentials, handleLoading, navigateTo) => async (dispatch) => {
        try {
            handleLoading(true);

            const result = await axios.post(
                API_ENDPOINTS.AUTH.REGISTER,
                credentials
            );
            localStorage.setItem(TOKEN_NAME, result.data.token);

            toast.success('User registered');
            handleLoading(false);
            navigateTo(ROUTES.SIGN_IN);
        } catch (err) {
            handleLoading(false);
            errResponse(err);
        }
    };

export const login =
    (credentials, handleLoading, navigateTo) => async (dispatch) => {
        try {
            handleLoading(true);

            const result = await axios.post(
                API_ENDPOINTS.AUTH.LOGIN,
                credentials
            );
            localStorage.setItem(TOKEN_NAME, result.data.token);

            const response = await axios.get(API_ENDPOINTS.AUTH.CURRENT_USER);

            handleLoading(false);
            dispatch(LOGIN_SUCCESS(response.data.user));
            navigateTo(ROUTES.DEFAULT);
        } catch (err) {
            handleLoading(false);
            errResponse(err);
        }
    };

export const getCurrentUser = (handleLoading) => async (dispatch) => {
    try {
        const result = await axios.get(API_ENDPOINTS.AUTH.CURRENT_USER);

        handleLoading(false);
        dispatch(LOGIN_SUCCESS(result.data.user));
    } catch (err) {
        handleLoading(false);
        errResponse(err);
        dispatch(LOGIN_FAIL());
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem(TOKEN_NAME);
    if (sessionStorage.getItem(VERIFICATION_TOKEN_NAME))
        sessionStorage.removeItem(VERIFICATION_TOKEN_NAME);
    dispatch(LOGOUT());
};

export const forgotPassword =
    (values, handleLoading, handleIsCodeSent) => async (dispatch) => {
        try {
            handleLoading(true);

            const result = await axios.post(
                API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
                values
            );

            handleLoading(false);
            toast.success(result.data.message);
            handleIsCodeSent();
        } catch (err) {
            handleLoading(false);
            errResponse(err);
        }
    };

export const resetPassword =
    (values, handleLoading, handleIsPasswordChanged) => async (dispatch) => {
        try {
            handleLoading(true);

            await axios.patch(API_ENDPOINTS.AUTH.RESET_PASSWORD, values);

            handleLoading(false);
            handleIsPasswordChanged();
        } catch (err) {
            handleLoading(false);
            errResponse(err);
        }
    };

export const generateMasterPassword =
    (values, handleLoading, navigateTo) => async (dispatch) => {
        try {
            handleLoading(true);

            const response = await axios.post(
                API_ENDPOINTS.AUTH.MASTER_PASSWORD.GENERATE,
                {
                    masterPassword: values.password,
                }
            );
            if (response.status !== 201 && !response.data)
                return toast.error(MESSAGES.SOMETHING_WRONG);

            handleLoading(false);
            sessionStorage.setItem('verified', response.data.token);
            navigateTo(ROUTES.DEFAULT);
        } catch (err) {
            handleLoading(false);
            if (err.response) return toast.error(err.response.data.message);
            toast.error(err.message);
        }
    };

export const verifyMasterPassword =
    (values, handleLoading, push) => async (dispatch) => {
        try {
            handleLoading(true);

            const response = await axios.post(
                API_ENDPOINTS.AUTH.MASTER_PASSWORD.CHECK,
                {
                    masterPassword: values.password,
                }
            );
            if (response.status !== 200 && !response.data)
                return toast.error(MESSAGES.SOMETHING_WRONG);

            handleLoading(false);
            sessionStorage.setItem('verified', response.data.token);
            push(ROUTES.DEFAULT);
        } catch (err) {
            handleLoading(false);
            if (err.response) return toast.error(err.response.data.message);
            toast.error(err.message);
        }
    };
