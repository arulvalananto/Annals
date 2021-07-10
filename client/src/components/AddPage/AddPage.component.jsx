import React, { useState } from "react";
import "./AddPage.style.scss";
// Other Components
import Button from "../Button/Button.component";
import TextEditor from "../TextEditor/TextEditor.component";

import { dateString } from "../../utils/dates";

import { useHistory } from "react-router-dom";


import axios from "../../axios";

import { fetchUser } from "../../redux/reducers/auth.reducer";
import { setFailureMessage } from "../../redux/reducers/message.reducer";
import { useDispatch } from "react-redux";

const AddPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const changeHandler = (val) => {
    setContent(val);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/add-timeline", {
        content,
      });

      if (response.data) {
        dispatch(fetchUser(response.data));
      }
      setLoading(false);
      history.push("/diary");
    } catch (err) {
      if (err.response) {
        dispatch(setFailureMessage(err.response?.data.message));
        history.push("/diary");
      }
      setLoading(false);
    }
  };

  return (
    <div className="addPage">
      <div className="addPage__top">
        <button
          type="button"
          className="addPage__topButton addPage__topButton--back"
          onClick={() => history.goBack()}
          disabled={loading}
        >
          Back
        </button>
        <p className="addPage__topDate">{dateString(Date.now())}</p>
        <Button
          type="button"
          className="addPage__topButton"
          loading={loading}
          disabled={loading}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
      <TextEditor body={content} changeHandler={changeHandler} />
    </div>
  );
};

export default AddPage;
