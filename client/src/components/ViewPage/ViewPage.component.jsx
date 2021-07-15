import React, { useState } from "react";
import "./viewPage.style.scss";

import Button from "../Button/Button.component";
// React Redux
import { useDispatch, useSelector } from "react-redux";
// React Router
import { useHistory, useParams } from "react-router";
// Axios
import axios from "../../axios";
// Utils
import { dateString } from "../../utils/dates";
// Reducers
import { fetchUser } from "../../redux/reducers/auth.reducer";
import { setFailureMessage } from "../../redux/reducers/message.reducer";

const ViewPage = () => {
  const { id } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const pages = useSelector((state) => state.auth.user.diary);
  const page = pages.find((el) => el._id === id);

  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState(page.content);

  const toggleEdit = () => {
    setIsEditMode((prevState) => !prevState);
    setContent(page.content);
  };

  const submitHandler = async () => {
    if (content.length < 1)
      return dispatch(setFailureMessage("content should not be empty"));
    if (content?.trim() === page.content)
      return dispatch(
        setFailureMessage("You should modify the content before change")
      );
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/v1/update-timeline/${page._id}`,
        { content }
      );
      dispatch(fetchUser(response?.data));

      history.push("/diary");
      setLoading(false);
    } catch (err) {
      dispatch(setFailureMessage(err?.response?.data?.message));
      setLoading(false);
    }
  };

  return (
    <div className="viewPage">
      <div className="viewPage__top">
        <button
          type="button"
          disabled={loading}
          className="viewPage__topButton viewPage__topButton--back"
          onClick={() => history.goBack()}
        >
          Back
        </button>
        <p className="viewPage__topDate">{dateString(page.writtenAt)}</p>
        <div className="viewPage__topButtonContainer">
          <button
            type="button"
            disabled={loading}
            className={`viewPage__topButton ${
              isEditMode && "viewPage__topButton--cancel"
            }`}
            onClick={toggleEdit}
          >
            {isEditMode ? "Cancel" : "Edit"}
          </button>
          {isEditMode && (
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="viewPage__topButton"
              onClick={submitHandler}
            >
              Save
            </Button>
          )}
        </div>
      </div>
      <div className="viewPage__bottom">
        <textarea
          disabled={isEditMode ? false : true}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="viewPage__bottomContent"
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPage;
