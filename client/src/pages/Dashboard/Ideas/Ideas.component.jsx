import React, { useCallback, useEffect, useState } from "react";
import "./Ideas.style.scss";
// Reducers
import { useDispatch, useSelector } from "react-redux";
import {
  addIdea,
  deleteIdea,
  updateIdea,
} from "../../../redux/actions/user.actions";
import { selectIdeas } from "../../../redux/reducers/auth.reducer";
import { setFailureMessage } from "../../../redux/reducers/message.reducer";
// Icons
import { BsArrowRight } from "react-icons/bs";
import { CircularProgress } from "@material-ui/core";
// Other Components
import YesOrNoModel from "../../../components/YesOrNoModel/YesOrNoModel.component";
import Idea from "../../../components/Idea/Idea.component";

const Ideas = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const ideas = useSelector(selectIdeas);

  const clearInput = () => {
    setTitle("");
    setContent("");
  };

  const toggleLoading = (val) => setLoading(val);

  const addIdeaHandler = async (e) => {
    e.preventDefault();
    dispatch(addIdea(toggleLoading, title, content, clearInput));
  };

  useEffect(() => {}, [ideas]);

  const clearDelete = () => {
    selectDeleteId("");
    setOpenModal(false);
  };

  const editIdeaHandler = useCallback(
    async (id, content, updatedContent) => {
      if (!updatedContent) {
        return dispatch(setFailureMessage("idea should not be empty!"));
      }
      if (content === updatedContent.trim()) {
        return dispatch(setFailureMessage("no change happens"));
      }
      dispatch(updateIdea(toggleLoading, id, updatedContent));
    },
    [dispatch]
  );

  const deleteIdeaHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteIdea(toggleLoading, deleteId, clearDelete));
  };

  const selectDeleteId = (id) => {
    setDeleteId(id);
    setOpenModal(true);
  };

  const renderIdea = useCallback(() => {
    if (!ideas || ideas?.length === 0) {
      return <p className='ideas--empty'>No Ideas yet...</p>;
    }

    return ideas.map((idea) => (
      <Idea
        key={idea._id}
        idea={idea}
        editHandler={editIdeaHandler}
        deleteHandler={selectDeleteId}
      />
    ));
  }, [ideas, editIdeaHandler]);

  return (
    <div className='ideas'>
      <div
        className='ideas--overlay'
        style={{ display: `${title ? "block" : "none"}` }}></div>
      <form onSubmit={addIdeaHandler} className='ideas__header'>
        <div className='ideas__headerForm'>
          <input
            type='text'
            placeholder='Add Idea (Title)'
            className='ideas__headerFormInput'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button
            type='submit'
            className='ideas__headerFormButton'
            style={{ display: `${title && content ? "block" : "none"}` }}>
            {loading ? (
              <CircularProgress size={18} color='inherit' />
            ) : (
              <BsArrowRight size='20' />
            )}
          </button>
        </div>
        <textarea
          style={{
            display: `${title ? "block" : "none"}`,
          }}
          className='ideas__headerFormContent'
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder='Type Your Idea'
        />
      </form>
      <div className='ideas__footer'>{renderIdea()}</div>
      {openModal && (
        <YesOrNoModel
          yes={deleteIdeaHandler}
          no={clearDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Ideas;
