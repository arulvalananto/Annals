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
    (loading, setFocus, setInitialState) => async (dispatch) => {
        try {
            const response = await axios.get(API_ENDPOINTS.DASHBOARD.COMMON);
            dispatch(FETCH_DASHBOARD(response.data));

            setFocus(response.data.focus);
            setInitialState(response.data.focus);
        } catch (error) {
            errResponse(error);
        } finally {
            loading(false);
        }
    };

export const fetchFocusHistory = (loading) => async (dispatch) => {
    try {
        const response = await axios.get(API_ENDPOINTS.FOCUS);
        dispatch(FETCH_FOCUSES(response.data.focuses));
    } catch (error) {
        errResponse(error);
    } finally {
        loading(false);
    }
};

export const changeFocus =
    (agendum, loading, setInitialState) => async (dispatch) => {
        try {
            loading(true);
            await axios.post(API_ENDPOINTS.FOCUS, { agendum });

            dispatch(UPDATE_FOCUS(agendum));
            dispatch(UPDATE_FOCUS_LIST(agendum));
            setInitialState(agendum);
        } catch (error) {
            errResponse(error);
        } finally {
            loading(false);
        }
    };
