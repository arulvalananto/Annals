import toast from 'react-hot-toast';

import axios from '../../api/axios';
import {
    ADDED_JOURNAL,
    FETCHED_JOURNALS,
    UPDATED_JOURNAL,
} from '../reducers/journals.reducer';
import { MESSAGES, ROUTES } from '../../utils/constants';
import { errResponse } from '../../utils/helpers';
import { API_ENDPOINTS } from '../../api/constants';
import { setLoading, clearLoading } from './loader.actions';
import { UPDATE_JOURNAL_COUNT } from '../reducers/dashboard.reducer';

export const fetchJournals = (handleLoading) => async (dispatch) => {
    try {
        handleLoading(true);

        const result = await axios.get(API_ENDPOINTS.JOURNALS.GET);
        dispatch(FETCHED_JOURNALS(result.data.journals));
    } catch (err) {
        errResponse(err);
    } finally {
        handleLoading(false);
    }
};

export const addJournal = (content, navigateTo) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const result = await axios.post(API_ENDPOINTS.JOURNALS.ADD, {
            content,
        });
        dispatch(ADDED_JOURNAL(result.data.journal));
        dispatch(UPDATE_JOURNAL_COUNT());

        toast.success(MESSAGES.JOURNAL.ADD);
        navigateTo(ROUTES.JOURNALS);
    } catch (err) {
        errResponse(err);
    } finally {
        dispatch(clearLoading(false));
    }
};

export const updateJournal = (content, id, navigateTo) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        await axios.patch(`${API_ENDPOINTS.JOURNALS.UPDATE}/${id}`, {
            content,
        });
        dispatch(UPDATED_JOURNAL({ id, content }));

        toast.success(MESSAGES.JOURNAL.UPDATE);
        navigateTo(ROUTES.JOURNALS);
    } catch (err) {
        errResponse(err);

        dispatch(clearLoading(false));
    } finally {
        dispatch(clearLoading(false));
    }
};
