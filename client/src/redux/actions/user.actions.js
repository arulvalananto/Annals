import axios from "../../axios";
import {
  pageAdded,
  pageUpdated,
  pinCreated,
  passwordFetched,
  passwordDeleted,
  ideaAdded,
  ideaUpdated,
  ideaDeleted,
  taskAdded,
  taskStatusUpdated,
  taskDeleted,
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
    history.push("/journals");
  } catch (err) {
    dispatch(setFailureMessage(err.response?.data.message));
    history.push("/journals");
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
      history.push("/journals");
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
  (loading, credentials, history) => async (dispatch) => {
    try {
      loading(true);
      const response = await axios.post("/password/add", credentials);
      loading(false);
      dispatch(passwordFetched(response?.data));
      history.push("/passwords");
    } catch (err) {
      dispatch(setFailureMessage(err.response?.data.message));
      loading(false);
    }
  };

export const verifyPin =
  (password, pin, verified, loading, unlock) => async (dispatch) => {
    try {
      loading(true);
      const res = await axios.post("/password/verify-pin", {
        password,
        pin,
      });
      loading(false);
      verified(res.data.decryptPassword);
      unlock(false);
    } catch (err) {
      dispatch(setFailureMessage(err.response?.data.message));
      loading(false);
    }
  };

export const deletePassword =
  (loading, id, toggleDeleteModel, history) => async (dispatch) => {
    try {
      loading(true);
      const res = await axios.delete(`/password/delete/${id}`);
      loading(false);
      if (res.data?.deleted) {
        history.push("/passwords");
        dispatch(passwordDeleted({ id }));
      }
      toggleDeleteModel();
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
      dispatch(ideaDeleted({ id: deleteId }));
      await axios.delete(`/ideas/delete/${deleteId}`);
      loading(false);
      clearDelete();
    } catch (err) {
      clearDelete();
      dispatch(setFailureMessage(err.response?.data?.message));
      loading(false);
    }
  };

export const addTask = (loading, task, history) => async (dispatch) => {
  try {
    loading(true);
    const res = await axios.post("/tasks/add", task);
    loading(false);
    dispatch(taskAdded(res?.data));
    history.push("/tasks");
  } catch (err) {
    loading(false);
    setFailureMessage(err.response?.data);
  }
};

export const updateTaskStatus = (id, status) => async (dispatch) => {
  dispatch(taskStatusUpdated({ id, status }));
  try {
    const res = await axios.patch(`/tasks/update-status/${id}`, { status });
    if (!res.data.updated) {
      setFailureMessage("Something Wrong!");
    }
  } catch (e) {
    setFailureMessage(e.response?.data);
  }
};

export const deleteTask = (loading, deleteId) => async (dispatch) => {
  try {
    loading(true);
    dispatch(taskDeleted({ id: deleteId }));
    await axios.delete(`/tasks/delete/${deleteId}`);
    loading(false);
  } catch (err) {
    dispatch(setFailureMessage(err.response?.data?.message));
    loading(false);
  }
};
