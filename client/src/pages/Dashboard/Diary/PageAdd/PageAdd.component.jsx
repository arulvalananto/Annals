import React, { useState } from "react";
import "./PageAdd.style.scss";
// Other Components
import TextEditor from "../../../../components/TextEditor/TextEditor.component";
// Utilities
import { dateString } from "../../../../utils/dates";
// React Router
import { useHistory } from "react-router-dom";
// Reducers
import { useDispatch } from "react-redux";
import { addPage } from "../../../../redux/actions/user.actions";

const PageAdd = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleLoading = (val) => setLoading(val);

  const changeHandler = (val) => setContent(val);

  const submitHandler = async () => {
    dispatch(addPage(content, toggleLoading, history));
  };

  return (
    <div className='pageAdd'>
      <div className='pageAdd__top'>
        <button
          type='button'
          className='pageAdd__topButton pageAdd__topButton--back'
          onClick={() => history.goBack()}
          disabled={loading}
        >
          Back
        </button>
        <p className='pageAdd__topDate'>{dateString(Date.now())}</p>
        <button
          type='button'
          className='pageAdd__topButton'
          loading={loading}
          disabled={loading}
          onClick={submitHandler}
        >
          Save
        </button>
      </div>
      <p className='pageAdd__date'>{dateString(Date.now())} :</p>
      <TextEditor body={content} changeHandler={changeHandler} />
    </div>
  );
};

export default PageAdd;
