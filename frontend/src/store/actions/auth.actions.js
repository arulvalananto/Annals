import toast from 'react-hot-toast';

import axios from '../../api/axios';
import { ROUTES } from '../../utils/routes';
import { errResponse } from '../../utils/helpers';
import { API_ENDPOINTS } from '../../api/constants';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../reducers/auth.reducer';
import { MESSAGES } from '../../utils/constants';

export const register =
    (credentials, handleLoading, navigateTo) => async (dispatch) => {
        try {
            handleLoading(true);

            const result = await axios.post(
                API_ENDPOINTS.AUTH.REGISTER,
                credentials
            );
            localStorage.setItem('token', result.data.token);

            toast.success('User registered');
            navigateTo(ROUTES.SIGN_IN);
        } catch (err) {
            errResponse(err);
        } finally {
            handleLoading(false);
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
            localStorage.setItem('token', result.data.token);

            const response = await axios.get(API_ENDPOINTS.AUTH.CURRENT_USER);
            dispatch(LOGIN_SUCCESS(response.data.user));

            navigateTo(ROUTES.DEFAULT);
        } catch (err) {
            errResponse(err);
        } finally {
            handleLoading(false);
        }
    };

export const getCurrentUser = (handleLoading) => async (dispatch) => {
    try {
        const result = await axios.get(API_ENDPOINTS.AUTH.CURRENT_USER);

        dispatch(LOGIN_SUCCESS(result.data.user));
        handleLoading(false);
    } catch (err) {
        dispatch(LOGIN_FAIL());
        handleLoading(false);

        errResponse(err);
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    if (sessionStorage.getItem('verified'))
        sessionStorage.removeItem('verified');
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

            toast.success(result.data.message);
            handleIsCodeSent();
        } catch (err) {
            errResponse(err);
        } finally {
            handleLoading(false);
        }
    };

export const resetPassword =
    (values, handleLoading, handleIsPasswordChanged) => async (dispatch) => {
        try {
            handleLoading(true);

            await axios.patch(API_ENDPOINTS.AUTH.RESET_PASSWORD, values);

            handleIsPasswordChanged();
        } catch (err) {
            errResponse(err);
        } finally {
            handleLoading(false);
        }
    };

export const generateMasterPassword =
    (values, handleLoading, push) => async (dispatch) => {
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

            sessionStorage.setItem('verified', response.data.token);
            push(ROUTES.DEFAULT);
        } catch (err) {
            if (err.response) return toast.error(err.response.data.message);
            toast.error(err.message);
        } finally {
            handleLoading(false);
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

            sessionStorage.setItem('verified', response.data.token);
            push(ROUTES.DEFAULT);
        } catch (err) {
            if (err.response) return toast.error(err.response.data.message);
            toast.error(err.message);
        } finally {
            handleLoading(false);
        }
    };
