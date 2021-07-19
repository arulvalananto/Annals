import React, { useState } from "react";
import "./PasswordAdd.style.scss";
// Reducers
import { useDispatch } from "react-redux";
import { addPassword } from "../../redux/actions/user.actions";
// Other Components
import Button from "../Button/Button.component";

const INPUT_DATA = ["title", "link", "username", "password"];

const PasswordAdd = ({ toggleDetails }) => {
  const initialState = {
    title: "",
    link: "",
    username: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const clearInput = () => setCredentials(initialState);

  const toggleLoading = (val) => setLoading(val);

  const isValid = () => {
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

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const submitHandler = async () => {
    setErrors({});
    if (isValid) {
      dispatch(
        addPassword(toggleLoading, toggleDetails, clearInput, credentials)
      );
    }
  };

  const renderInput = () => {
    return INPUT_DATA?.map((name) => (
      <div className='passwordAdd__inputsContainer' key={name}>
        <div className='passwordAdd__inputContainer'>
          <label className='passwordAdd__label'>{name}</label>
          <input
            className='passwordAdd__input'
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
          <p className='passwordAdd__input--error'>{errors[name]}</p>
        )}
      </div>
    ));
  };

  return (
    <div className='passwordAdd'>
      <Button
        type='button'
        className='passwordAdd__backButton'
        onClick={() => toggleDetails("", "")}>
        Back
      </Button>
      <h3 className='passwordAdd__title'>Add Password</h3>
      <form className='passwordAdd__form'>{renderInput()}</form>
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

export default PasswordAdd;
