import React, { useCallback, useEffect, useState } from "react";
import "./Idea.scss";

import randomColor from "../../../utils/randomColor";

import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

import { fetchUser } from "../../../redux/reducers/authSlice";

import { CircularProgress } from "@material-ui/core";

const Idea = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

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
    setIsOpenModal(false);
  };

  const editIdea = () => {};

  const deleteIdea = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/v1/ideas/delete/${deleteId}`);
      dispatch(fetchUser(response.data));
      cancelDelete();
    } catch (err) {
      alert(err.response.data.message);
      setLoading(false);
    }
  };

  const selectDeleteId = (id) => {
    setDeleteId(id);
    setIsOpenModal(true);
  };

  const renderIdea = useCallback(() => {
    if (ideas.length === 0) {
      return <p className="idea-empty">No Ideas yet...</p>;
    }

    return ideas.map((idea) => (
      <div
        className="idea__footerCard"
        style={{ borderLeft: `4px solid ${randomColor()}` }}
        key={idea._id}
      >
        <span className="idea__footerCardContent">
          <h4 className="title">{idea.title}</h4>
          <p>{idea.content}</p>
        </span>
        <div className="idea__footerCardTools">
          <span className="edit">
            <FiEdit2 />
          </span>
          <span className="delete">
            <AiOutlineDelete onClick={() => selectDeleteId(idea._id)} />
          </span>
        </div>
      </div>
    ));
  }, [ideas]);

  const renderModel = () => {
    if (isOpenModal) {
      return (
        <>
          <div className="idea__modalOverlay"></div>
          <div className="idea__modal">
            <div className="idea__modalContainer">
              <h1>Are You Sure?</h1>
              <div className="button-container">
                <button onClick={cancelDelete}>No</button>
                <button onClick={deleteIdea}>
                  {loading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    "Yes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="idea">
      <div
        className="idea-overlay"
        style={{ display: `${title ? "block" : "none"}` }}
      ></div>
      <form onSubmit={addIdea} className="idea__header">
        <div className="idea__headerContainer">
          <input
            type="text"
            placeholder="Add Idea (Title)"
            className="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button
            type="submit"
            className="addButton"
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
          className="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Type Your Idea"
        />
      </form>
      <div className="idea__footer">{renderIdea()}</div>
      {renderModel()}
    </div>
  );
};

export default Idea;
