import React, { useCallback, useEffect, useState } from "react";
import "./Ideas.scss";

import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";

import { BsArrowRight } from "react-icons/bs";

import { fetchUser } from "../../../redux/reducers/authSlice";

import { CircularProgress } from "@material-ui/core";

import YesOrNoModel from "../../../components/YesOrNoModel/YesOrNoModel";
import Idea from "../../../components/Idea/Idea";

const Ideas = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const ideas = useSelector((state) => state.auth.userData.user.ideas.entries);

  const addIdea = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/v1/ideas/add", {
        title,
        content,
      });
      dispatch(fetchUser(response.data));
      setLoading(false);
      setTitle("");
      setContent("");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data.message);
    }
  };

  useEffect(() => {}, [ideas]);

  const cancelDelete = () => {
    selectDeleteId("");
    setOpenModal(false);
  };

  const editIdea = (id, content, updateContent) => {
    if (!updateContent) {
      return alert("idea should not be empty!");
    }
    if (content === updateContent.trim()) {
      return alert("no change happens");
    }

    console.log("updated");
  };

  const deleteIdea = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.delete(`/api/v1/ideas/delete/${deleteId}`);
      dispatch(fetchUser(response.data));
      cancelDelete();
      setLoading(false);
    } catch (err) {
      alert(err.response.data.message);
      setLoading(false);
    }
  };

  const selectDeleteId = (id) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  const renderIdea = useCallback(() => {
    if (ideas.length === 0) {
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
  }, [ideas]);

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
