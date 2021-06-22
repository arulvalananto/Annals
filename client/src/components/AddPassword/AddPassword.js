import React, { useState } from "react";
import "./AddPassword.scss";

import axios from "../../axios";

import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/reducers/authSlice";
import Button from "../Button/Button";

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
        if (response?.data) {
          dispatch(fetchUser(response.data));
          toggleDetails("", "");
          clearInput();
          setLoading(false);
        }
      } catch (err) {
        alert(err.response?.data.message);
        setLoading(false);
      }
    }
  };

  const renderInput = () => {
    return INPUT_DATA?.map((name) => (
      <div className="password__inputsContainer" key={name}>
        <div className="password__inputContainer">
          <label className="password__label">{name}</label>
          <input
            className="password__input"
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
            autoComplete="off"
          />
        </div>
        {errors[name] && <p className="password__error">{errors[name]}</p>}
      </div>
    ));
  };

  return (
    <div className="addPassword">
      <button
        type="button"
        className="password__back"
        onClick={() => toggleDetails("", "")}
      >
        Back
      </button>
      <h3 className="password__title">Add Password</h3>
      <form className="password__form">{renderInput()}</form>
      <div className="password__buttonContainer">
        <button
          type="button"
          className="password__reset"
          onClick={clearInput}
          disabled={loading}
        >
          Reset
        </button>
        <Button
          type="submit"
          className="password__submit"
          loading={loading}
          onClick={submitHandler}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddPassword;
