import React, { useEffect, useState } from "react";
import "./PasswordView.style.scss";
// Other Components
import Button from "../Button/Button.component";
import FormInput from "../FormInput/FormInput.component";
import YesOrNoModel from "../YesOrNoModel/YesOrNoModel.component";
// Reducers
import { useDispatch } from "react-redux";
import { deletePassword, verifyPin } from "../../redux/actions/user.actions";
//  React Icons
import {
  MdClear,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { Tooltip } from "@material-ui/core";

const INPUT_DATA = ["title", "link", "username", "password"];

const PasswordView = ({ passwordDetails, toggleDetails }) => {
  const initialState = {
    title: "",
    link: "",
    username: "",
    password: "",
  };

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(initialState);
  const [pin, setPin] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModel, setIsModel] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const dispatch = useDispatch();

  const toggleModel = () => setIsModel(!isModel);
  const toggleVisiblePassword = () => setIsVisible(!isVisible);
  const toggleDeleteModel = () => setIsDeleteModel(!isDeleteModel);
  const toggleLoading = (val) => setLoading(val);

  useEffect(() => {
    setVerify(false);
    setVerifiedPassword("");
    setIsVisible(false);
  }, [passwordDetails]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const verified = (val) => {
    setVerifiedPassword(val);
    setVerify(true);
    setIsModel(false);
    setPin("");
  };

  const verifyPasswordHandler = async (e) => {
    e.preventDefault();
    dispatch(verifyPin(passwordDetails, pin, verified, toggleLoading));
  };

  const deletePasswordHandler = async (e) => {
    e.preventDefault();
    dispatch(
      deletePassword(
        toggleLoading,
        passwordDetails,
        toggleDeleteModel,
        toggleDetails
      )
    );
  };

  return (
    <div className='passwordView__container'>
      <div className={`passwordView ${!verify && "passwordView--blur"}`}>
        <div className='passwordView__header'>
          <button
            type='button'
            className='passwordView__headerButton'
            onClick={() => toggleDetails("", "")}>
            Back
          </button>
          <MdDelete
            className='passwordView__headerDeleteButton'
            onClick={toggleDeleteModel}
            size='24'
            color='inherit'
          />
        </div>
        <h3 className='password__title'>Password Details</h3>
        <form className='password__form'>
          {INPUT_DATA?.map((name) => (
            <div className='password__inputsContainer' key={name}>
              <div className='password__inputContainer'>
                <label className='password__label'>{name}</label>
                <input
                  className='password__input'
                  type={`${
                    name === "link"
                      ? "url"
                      : name !== "password"
                      ? "text"
                      : verifiedPassword && isVisible
                      ? "text"
                      : "password"
                  }`}
                  disabled={false}
                  placeholder={`${
                    name === "username"
                      ? "Username / Email Address (Optional)"
                      : name === "link"
                      ? "(Optional)"
                      : ""
                  }`}
                  value={
                    name === "password"
                      ? verifiedPassword
                      : passwordDetails[name]
                  }
                  name={name}
                  onChange={changeHandler}
                  autoComplete='off'
                />
                {name === "password" && (
                  <p className='show-password'>
                    {isVisible ? (
                      <MdVisibility onClick={toggleVisiblePassword} />
                    ) : (
                      <MdVisibilityOff onClick={toggleVisiblePassword} />
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className='password__progressContainer'>
            <label className='password__label'>Password Strength</label>
            <Tooltip title={passwordDetails.passwordStrength + "%"}>
              <progress
                className='password__progress'
                max='100'
                value={+passwordDetails.passwordStrength}></progress>
            </Tooltip>
          </div>
          <div className='password__riskContainer'>
            <label className='password__label'>Risk</label>
            <p className={`password__risk ${passwordDetails.risk}`}>
              {passwordDetails.risk}
            </p>
          </div>
        </form>
        <div className='password__buttonContainer'>
          <button className='password__reset'>Update</button>
          <button className='password__submit'>Save</button>
        </div>
      </div>
      {!verify && (
        <div className='unlockButton__overlay'>
          <Button type='button' onClick={toggleModel}>
            Unlock
          </Button>
        </div>
      )}
      {isModel && (
        <>
          <div className='model-overlay'></div>
          <div className='model'>
            <form onSubmit={verifyPasswordHandler} className='model-container'>
              <h4 className='title'>Enter Password</h4>
              <FormInput
                className='form-input'
                type='password'
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
              <Button type='submit' loading={loading} disabled={loading}>
                Verify
              </Button>
              <MdClear className='clear' size={30} onClick={toggleModel} />
            </form>
          </div>
        </>
      )}
      {isDeleteModel && (
        <YesOrNoModel
          yes={deletePasswordHandler}
          no={toggleDeleteModel}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PasswordView;
