import axios from '../../api/axios';
import {
    FETCH_DASHBOARD,
    FETCH_FOCUSES,
    UPDATE_FOCUS,
    UPDATE_FOCUS_LIST,
} from '../reducers/dashboard.reducer';
import { errResponse } from '../../utils/helpers';
import { API_ENDPOINTS } from '../../api/constants';

export const fetchDashboardData =
    (handleLoading, setFocus, setInitialState) => async (dispatch) => {
        try {
            const response = await axios.get(API_ENDPOINTS.DASHBOARD.COMMON);

            setFocus(response.data.focus);
            setInitialState(response.data.focus);
            handleLoading(false);
            dispatch(FETCH_DASHBOARD(response.data));
        } catch (error) {
            handleLoading(false);
            errResponse(error);
        }
    };

export const fetchFocusHistory = (handleLoading) => async (dispatch) => {
    try {
        const response = await axios.get(API_ENDPOINTS.FOCUS);

        handleLoading(false);
        dispatch(FETCH_FOCUSES(response.data.focuses));
    } catch (error) {
        handleLoading(false);
        errResponse(error);
    }
};

export const changeFocus =
    (agendum, handleLoading, setInitialState) => async (dispatch) => {
        try {
            handleLoading(true);
            await axios.post(API_ENDPOINTS.FOCUS, { agendum });

            handleLoading(false);
            setInitialState(agendum);
            dispatch(UPDATE_FOCUS(agendum));
            dispatch(UPDATE_FOCUS_LIST(agendum));
        } catch (error) {
            handleLoading(false);
            errResponse(error);
        }
    };
