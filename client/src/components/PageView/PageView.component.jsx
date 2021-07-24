import React, { useState } from "react";
import "./PageView.style.scss";

// React Redux
import { useDispatch, useSelector } from "react-redux";
// React Router
import { useHistory, useParams } from "react-router";
// Utils
import { dateString } from "../../utils/dates";
// Reducers
import { selectDiary } from "../../redux/reducers/auth.reducer";
import { setFailureMessage } from "../../redux/reducers/message.reducer";
import { updatePage } from "../../redux/actions/user.actions";

const PageView = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const pages = useSelector(selectDiary);
  const page = pages.find((el) => el._id === id);

  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState(page.content);

  const toggleEdit = () => {
    setIsEditMode((prevState) => !prevState);
    setContent(page.content);
  };

  const toggleLoading = (val) => setLoading(val);

  const isValid = () => {
    if (content.length < 1) {
      dispatch(setFailureMessage("content should not be empty"));
      return false;
    }
    if (content?.trim() === page.content) {
      dispatch(
        setFailureMessage("You should modify the content before change")
      );
      return false;
    }

    return true;
  };

  const submitHandler = async () => {
    if (isValid)
      dispatch(updatePage(page._id, content, toggleLoading, history));
  };

  return (
    <div className='pageView'>
      <div className='pageView__top'>
        <button
          type='button'
          disabled={loading}
          className='pageView__topButton pageView__topButton--back'
          onClick={() => history.goBack()}
        >
          Back
        </button>
        <p className='pageView__topDate'>{dateString(page.createdAt)}</p>
        <div className='pageView__topButtonContainer'>
          <button
            type='button'
            disabled={loading}
            className={`pageView__topButton ${
              isEditMode && "pageView__topButton--cancel"
            }`}
            onClick={toggleEdit}
          >
            {isEditMode ? "Cancel" : "Edit"}
          </button>
          {isEditMode && (
            <button
              type='submit'
              loading={loading}
              disabled={loading}
              className='pageView__topButton'
              onClick={submitHandler}
            >
              Save
            </button>
          )}
        </div>
      </div>
      <p className='pageView__date'>{dateString(page.createdAt)} :</p>
      <div className='pageView__bottom'>
        <textarea
          disabled={isEditMode ? false : true}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='pageView__bottomContent'
        ></textarea>
      </div>
    </div>
  );
};

export default PageView;
