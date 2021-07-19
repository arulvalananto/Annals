import axios from "../../axios";
import {
  ideaAdded,
  ideaDeleted,
  ideaUpdated,
  pageAdded,
  pageUpdated,
  passwordDeleted,
  passwordFetched,
  pinCreated,
  todoAdded,
} from "../reducers/auth.reducer";
import { setFailureMessage } from "../reducers/message.reducer";

export const addPage = (content, loading, history) => async (dispatch) => {
  try {
    loading(true);
    const res = await axios.post("/diary/add", {
      content,
    });
    dispatch(pageAdded(res.data));
    loading(false);
    history.push("/diary");
  } catch (err) {
    dispatch(setFailureMessage(err.response?.data.message));
    history.push("/diary");
    loading(false);
  }
};

export const updatePage =
  (id, content, loading, history) => async (dispatch) => {
    try {
      loading(true);
      const res = await axios.patch(`/diary/update/${id}`, {
        content,
      });
      loading(false);
      dispatch(pageUpdated(res?.data));
      history.push("/diary");
    } catch (err) {
      dispatch(setFailureMessage(err?.response?.data?.message));
      loading(false);
    }
  };

export const changeCommonPin = (loading, modelChange) => async (dispatch) => {
  try {
    loading(true);
    await axios.get("/password/change-pin");
    loading(false);
    modelChange();
  } catch (err) {
    dispatch(setFailureMessage(err.response.data.message));
    loading(false);
  }
};

export const generatePin = (loading, toggleModal, pin) => async (dispatch) => {
  try {
    loading(true);
    const res = await axios.post("/password/generate-pin", {
      pin,
    });
    loading(false);
    dispatch(pinCreated(res?.data));
    toggleModal();
  } catch (err) {
    dispatch(setFailureMessage(err.response.data.message));
    loading(false);
  }
};

export const addPassword =
  (loading, toggleDetails, clearInput, credentials) => async (dispatch) => {
    try {
      loading(true);
      const response = await axios.post("/password/add", credentials);
      loading(false);
      dispatch(passwordFetched(response?.data));
      clearInput();
      toggleDetails("", "");
    } catch (err) {
      dispatch(setFailureMessage(err.response?.data.message));
      loading(false);
    }
  };

export const verifyPin =
  (passwordDetails, pin, verified, loading) => async (dispatch) => {
    try {
      loading(true);
      const res = await axios.post("/password/verify-pin", {
        password: passwordDetails.password,
        pin,
      });
      loading(false);
      verified(res.data.decryptPassword);
    } catch (err) {
      dispatch(setFailureMessage(err.response?.data.message));
      loading(false);
    }
  };

export const deletePassword =
  (loading, passwordDetails, toggleDeleteModel, toggleDetails) =>
  async (dispatch) => {
    try {
      loading(true);
      const res = await axios.delete(`/password/delete/${passwordDetails._id}`);
      loading(false);
      if (res.data?.deleted) {
        dispatch(passwordDeleted({ id: passwordDetails._id }));
      }
      toggleDeleteModel();
      toggleDetails("", "");
    } catch (err) {
      dispatch(setFailureMessage(err.response?.data.message));
      loading(false);
    }
  };

export const addIdea =
  (loading, title, content, clearInput) => async (dispatch) => {
    try {
      loading(true);
      const res = await axios.post("/ideas/add", {
        title,
        content,
      });
      loading(false);
      dispatch(ideaAdded(res.data));
      clearInput();
    } catch (err) {
      loading(false);
      dispatch(setFailureMessage(err.response?.data.message));
    }
  };

export const updateIdea = (loading, id, updatedContent) => async (dispatch) => {
  try {
    loading(true);
    const res = await axios.patch(`/ideas/update/${id}`, {
      content: updatedContent,
    });
    loading(false);
    dispatch(ideaUpdated(res.data));
  } catch (err) {
    loading(false);
    dispatch(setFailureMessage(err.response?.data.message));
  }
};

export const deleteIdea =
  (loading, deleteId, clearDelete) => async (dispatch) => {
    try {
      loading(true);
      const res = await axios.delete(`/ideas/delete/${deleteId}`);
      loading(false);
      if (res.data.deleted) {
        dispatch(ideaDeleted({ id: deleteId }));
      }
      clearDelete();
    } catch (err) {
      clearDelete();
      dispatch(setFailureMessage(err.response?.data?.message));
      loading(false);
    }
  };

export const addTodo =
  (loading, content, clearInput, toggleEditMode) => async (dispatch) => {
    try {
      loading(true);
      const res = await axios.post("/todos/add", { content });
      loading(false);
      dispatch(todoAdded(res?.data));
      toggleEditMode();
      clearInput();
    } catch (err) {
      loading(false);
      setFailureMessage(err.response?.data);
    }
  };
