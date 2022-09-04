import axios from '../../api/axios';
import {
    ADD_IDEA,
    FETCH_IDEAS,
    DELETE_IDEA,
    UPDATE_IDEA,
} from '../reducers/ideas.reducer';
import { errResponse } from '../../utils/helpers';
import { API_ENDPOINTS } from '../../api/constants';
import { clearLoading, setLoading } from './loader.actions';

export const fetchIdeas = () => async (dispatch) => {
    try {
        dispatch(setLoading());

        const result = await axios.get(API_ENDPOINTS.IDEAS.GET);
        dispatch(FETCH_IDEAS(result.data.ideas));
    } catch (err) {
        errResponse(err);
    } finally {
        dispatch(clearLoading());
    }
};
export const addIdea = (idea, clearFields) => async (dispatch) => {
    try {
        dispatch(setLoading());

        const result = await axios.post(API_ENDPOINTS.IDEAS.ADD, idea);
        dispatch(ADD_IDEA(result.data.idea));

        clearFields();
    } catch (err) {
        errResponse(err);
    } finally {
        dispatch(clearLoading());
    }
};
export const updateIdea = (id, values) => async (dispatch) => {
    try {
        dispatch(setLoading());

        await axios.patch(`${API_ENDPOINTS.IDEAS.UPDATE}/${id}`, values);
        dispatch(UPDATE_IDEA({ id, values }));
    } catch (err) {
        errResponse(err);
    } finally {
        dispatch(clearLoading());
    }
};
export const deleteIdea = (id) => async (dispatch) => {
    try {
        dispatch(setLoading());

        await axios.delete(`${API_ENDPOINTS.IDEAS.DELETE}/${id}`);
        dispatch(DELETE_IDEA(id));
    } catch (err) {
        errResponse(err);
    } finally {
        dispatch(clearLoading());
    }
};
