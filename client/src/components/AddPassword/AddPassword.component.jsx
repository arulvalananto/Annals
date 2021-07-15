import React, { useState } from "react";
import "./AddPassword.style.scss";

import axios from "../../axios";

import { useDispatch } from "react-redux";
import { passwordFetched } from "../../redux/reducers/auth.reducer";
import { setFailureMessage } from "../../redux/reducers/message.reducer";
import Button from "../Button/Button.component";

const INPUT_DATA = ["title", "link", "username", "password"];

const AddPassword = ({ toggleDetails }) => {
  const initialState = {
    title: "",
    link: "",
    username: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initialState);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const clearInput = () => {
    setCredentials(initialState);
  };

  const validate = () => {
    let titleError = "";
    let passwordError = "";

    if (credentials.title.length === 0) {
      titleError = "Please enter valid title";
    }
    if (credentials.password.length === 0) {
      passwordError = "Please enter valid password";
    }
    if (passwordError || titleError) {
      setErrors({
        ...errors,
        title: titleError,
        password: passwordError,
      });
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    setErrors({});
    const isValid = validate();
    if (isValid) {
      try {
        setLoading(true);
        const response = await axios.post("/api/v1/password/add", credentials);
        dispatch(passwordFetched(response?.data));
        toggleDetails("", "");
        clearInput();
        setLoading(false);
      } catch (err) {
        dispatch(setFailureMessage(err.response?.data.message));
        setLoading(false);
      }
    }
  };

  const renderInput = () => {
    return INPUT_DATA?.map((name) => (
      <div className='addPassword__inputsContainer' key={name}>
        <div className='addPassword__inputContainer'>
          <label className='addPassword__label'>{name}</label>
          <input
            className='addPassword__input'
            type={`${
              name === "link"
                ? "url"
                : name !== "password"
                ? "text"
                : "password"
            }`}
            placeholder={`${
              name === "username"
                ? "Username / Email Address (Optional)"
                : name === "link"
                ? "(Optional)"
                : ""
            }`}
            value={credentials[name]}
            name={name}
            onChange={changeHandler}
            autoComplete='off'
          />
        </div>
        {errors[name] && (
          <p className='addPassword__input--error'>{errors[name]}</p>
        )}
      </div>
    ));
  };

  return (
    <div className='addPassword'>
      <Button
        type='button'
        className='addPassword__backButton'
        onClick={() => toggleDetails("", "")}>
        Back
      </Button>
      <h3 className='addPassword__title'>Add Password</h3>
      <form className='addPassword__form'>{renderInput()}</form>
      <div className='password__buttonContainer'>
        <Button type='button' inverted onClick={clearInput} disabled={loading}>
          Reset
        </Button>
        <Button
          type='submit'
          loading={loading}
          onClick={submitHandler}
          disabled={loading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddPassword;
