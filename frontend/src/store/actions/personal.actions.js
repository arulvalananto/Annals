import toast from 'react-hot-toast';

import axios from '../../api/axios';
import {
    FETCH_PERSONAL_DATA,
    ADD_PERSONAL_DATA,
    DELETE_PERSONAL_DATA,
    UPDATE_PERSONAL_DATA,
} from '../reducers/personal.reducer';
import { ROUTES } from '../../utils/routes';
import { errResponse } from '../../utils/helpers';
import { API_ENDPOINTS } from '../../api/constants';

export const fetchPersonalData = (handleLoading) => async (dispatch) => {
    try {
        const response = await axios.get(API_ENDPOINTS.PERSONAL.GET);
        dispatch(FETCH_PERSONAL_DATA(response.data));
    } catch (err) {
        errResponse(err);
    } finally {
        handleLoading(false);
    }
};

export const createPersonalData =
    (values, handleLoading, navigateTo) => async (dispatch) => {
        try {
            handleLoading(true);
            const response = await axios.post(
                API_ENDPOINTS.PERSONAL.CREATE,
                values
            );
            if (response.status === 201) {
                dispatch(ADD_PERSONAL_DATA(values));

                toast.success(`New ${values.category} added`);
                navigateTo(ROUTES.PERSONAL);
            }
        } catch (err) {
            errResponse(err);
        } finally {
            handleLoading(false);
        }
    };

export const deletePersonalData =
    (handleLoading, id, category, pickedId) => async (dispatch) => {
        try {
            handleLoading(true);

            const response = await axios.delete(
                `${ROUTES.PERSONAL}/${id}/${category}`
            );
            if (response.status === 200) {
                dispatch(DELETE_PERSONAL_DATA({ id, category }));

                toast.success(`${category} deleted`);
                pickedId('');
            }
        } catch (err) {
            errResponse(err);
        } finally {
            handleLoading(false);
        }
    };

export const updateCard =
    (values, id, handleLoading, handleEditMode) => async (dispatch) => {
        try {
            handleLoading(true);
            const response = await axios.patch(
                `${ROUTES.PERSONAL}/${id}/card`,
                values
            );
            if (response.status === 200 && response.data) {
                dispatch(
                    UPDATE_PERSONAL_DATA({ id, category: 'card', values })
                );
                toast.success(response.data.message);
                handleEditMode();
            }
        } catch (error) {
            errResponse(error);
        } finally {
            handleLoading(false);
        }
    };

export const updatePassword =
    (values, id, handleLoading, handleEditMode) => async (dispatch) => {
        try {
            handleLoading(true);
            const response = await axios.patch(
                `${ROUTES.PERSONAL}/${id}/password`,
                values
            );
            if (response.status === 200 && response.data) {
                dispatch(
                    UPDATE_PERSONAL_DATA({ id, category: 'password', values })
                );

                toast.success(response.data.message);
                handleEditMode();
            }
        } catch (error) {
            errResponse(error);
        } finally {
            handleLoading(false);
        }
    };
