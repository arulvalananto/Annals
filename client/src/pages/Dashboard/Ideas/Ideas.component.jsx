import React, { useCallback, useEffect, useState } from "react";
import "./Ideas.style.scss";

import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";

import { BsArrowRight } from "react-icons/bs";

import { fetchUser } from "../../../redux/reducers/auth.reducer";
import { setFailureMessage } from "../../../redux/reducers/message.reducer";

import { CircularProgress } from "@material-ui/core";

import YesOrNoModel from "../../../components/YesOrNoModel/YesOrNoModel.component";
import Idea from "../../../components/Idea/Idea.component";

const Ideas = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const ideas = useSelector((state) => state.auth.user.ideas.entries);

  const addIdea = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post("/api/v1/ideas/add", {
        title,
        content,
      });

      setTitle("");
      setContent("");

      dispatch(fetchUser(response.data));

      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatch(setFailureMessage(err.response?.data.message));
    }
  };

  useEffect(() => {}, [ideas]);

  const cancelDelete = () => {
    selectDeleteId("");
    setOpenModal(false);
  };

  const editIdea = useCallback(
    async (id, content, updatedContent) => {
      if (!updatedContent) {
        return dispatch(setFailureMessage("idea should not be empty!"));
      }
      if (content === updatedContent.trim()) {
        return dispatch(setFailureMessage("no change happens"));
      }
      try {
        setLoading(true);

        const res = await axios.patch(`/api/v1/ideas/update/${id}`, {
          content: updatedContent,
        });

        setLoading(false);
        dispatch(fetchUser(res.data));
      } catch (err) {
        setLoading(false);
        dispatch(setFailureMessage(err.response?.data.message));
      }
    },
    [dispatch]
  );

  const deleteIdea = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.delete(`/api/v1/ideas/delete/${deleteId}`);

      cancelDelete();
      dispatch(fetchUser(response.data));
      setLoading(false);
    } catch (err) {
      cancelDelete();
      dispatch(setFailureMessage(err.response.data.message));
      setLoading(false);
    }
  };

  const selectDeleteId = (id) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  const renderIdea = useCallback(() => {
    if (!ideas || ideas?.length === 0) {
      return <p className="ideas--empty">No Ideas yet...</p>;
    }

    return ideas.map((idea) => (
      <Idea
        key={idea._id}
        idea={idea}
        editHandler={editIdea}
        deleteHandler={selectDeleteId}
      />
    ));
  }, [ideas, editIdea]);

  return (
    <div className="ideas">
      <div
        className="ideas--overlay"
        style={{ display: `${title ? "block" : "none"}` }}
      ></div>
      <form onSubmit={addIdea} className="ideas__header">
        <div className="ideas__headerForm">
          <input
            type="text"
            placeholder="Add Idea (Title)"
            className="ideas__headerFormInput"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button
            type="submit"
            className="ideas__headerFormButton"
            style={{ display: `${title && content ? "block" : "none"}` }}
          >
            {loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <BsArrowRight size="20" />
            )}
          </button>
        </div>
        <textarea
          style={{
            display: `${title ? "block" : "none"}`,
          }}
          className="ideas__headerFormContent"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Type Your Idea"
        />
      </form>
      <div className="ideas__footer">{renderIdea()}</div>
      {openModal && (
        <YesOrNoModel yes={deleteIdea} no={cancelDelete} loading={loading} />
      )}
    </div>
  );
};

export default Ideas;
