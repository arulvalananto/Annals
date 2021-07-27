import React, { useState } from "react";
import "./PasswordAdd.style.scss";
// Reducers
import { useDispatch } from "react-redux";
import { addPassword } from "../../../../redux/actions/user.actions";
// Other Components
import Button from "../../../../components/Button/Button.component";
import { useHistory } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip, Zoom } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const INPUT_DATA = [
  {
    name: "title",
    info: "Name of the application/organization belonging to the password",
  },
  {
    name: "link",
    info: "Name of the application/organization website address",
    optional: true,
  },
  {
    name: "username",
    info: "Username / Email Address / Phone Number / App Id",
    optional: true,
  },
  { name: "password", info: "" },
];

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
  const history = useHistory();

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
    if (isValid()) {
      dispatch(addPassword(toggleLoading, toggleDetails, credentials));
    }
  };

  const InfoTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }))(Tooltip);

  const renderInput = () => {
    return INPUT_DATA?.map(({ name, info, optional }) => (
      <div className='passwordAdd__formContainer'>
        <div className='passwordAdd__labelContainer'>
          <label className='passwordAdd__label'>
            {name}
            <span>{optional && "optional"}</span>
          </label>
          {info && (
            <InfoTooltip
              title={info}
              placement='top'
              interactive
              TransitionComponent={Zoom}
            >
              <p>
                <AiOutlineInfoCircle size={18} />
              </p>
            </InfoTooltip>
          )}
        </div>
        <div className='passwordAdd__inputContainer'>
          {name === "link" && (
            <p className='passwordAdd__input--prefix'>https://</p>
          )}
          <input
            className={`passwordAdd__input ${
              name === "link" && "passwordAdd__input--suffix"
            }`}
            type={`${
              name === "link"
                ? "url"
                : name !== "password"
                ? "text"
                : "password"
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
      <h3 className='passwordAdd__title'>Add Password</h3>
      <form className='passwordAdd__form'>{renderInput()}</form>
      <div className='passwordAdd__buttonContainer'>
        <Button
          type='button'
          inverted
          disabled={loading}
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        <Button
          type='submit'
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

export default PasswordAdd;
