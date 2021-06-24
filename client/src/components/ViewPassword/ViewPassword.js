import { Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ViewPassword.scss";
import Button from "../Button/Button";
import axios from "../../axios";
import FormInput from "../FormInput/FormInput";
import {
  MdClear,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { fetchUser } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import YesOrNoModel from "../YesOrNoModel/YesOrNoModel";

const INPUT_DATA = ["title", "link", "username", "password"];

const ViewPassword = ({ passwordDetails, toggleDetails }) => {
  const initialState = {
    title: "",
    link: "",
    username: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialState);

  const [pin, setPin] = useState("");

  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [verify, setVerify] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isModel, setIsModel] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const toggleModel = () => setIsModel(!isModel);

  const toggleVisiblePassword = () => setIsVisible(!isVisible);

  const toggleDeleteModel = () => setIsDeleteModel(!isDeleteModel);

  useEffect(() => {
    setVerify(false);
    setVerifiedPassword("");
    setIsVisible(false);
  }, [passwordDetails]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const verifyPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/password/verify-pin", {
        password: passwordDetails.password,
        pin,
      });

      setVerifiedPassword(response.data.decryptPassword);

      setVerify(true);
      setIsModel(false);
      setPin("");
      setLoading(false);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const deletePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/v1/password/delete/${passwordDetails._id}`
      );

      dispatch(fetchUser(response.data));

      setIsDeleteModel(false);
      toggleDetails("", "");
      setLoading(false);
    } catch (err) {
      alert(err.response?.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="viewPassword__container">
      <div className={`viewPassword ${!verify && "viewPassword--blur"}`}>
        <div className="viewPassword__header">
          <button
            type="button"
            className="viewPassword__headerButton"
            onClick={() => toggleDetails("", "")}
          >
            Back
          </button>
          <MdDelete
            className="viewPassword__headerDeleteButton"
            onClick={toggleDeleteModel}
            size="24"
            color="inherit"
          />
        </div>
        <h3 className="password__title">Password Details</h3>
        <form className="password__form">
          {INPUT_DATA?.map((name) => (
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
                  autoComplete="off"
                />
                {name === "password" && (
                  <p className="show-password">
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
          <div className="password__progressContainer">
            <label className="password__label">Password Strength</label>
            <Tooltip title={passwordDetails.passwordStrength + "%"}>
              <progress
                className="password__progress"
                max="100"
                value={+passwordDetails.passwordStrength}
              ></progress>
            </Tooltip>
          </div>
          <div className="password__riskContainer">
            <label className="password__label">Risk</label>
            <p className={`password__risk ${passwordDetails.risk}`}>
              {passwordDetails.risk}
            </p>
          </div>
        </form>
        <div className="password__buttonContainer">
          <button className="password__reset">Update</button>
          <button className="password__submit">Save</button>
        </div>
      </div>
      {!verify && (
        <div className="unlockButton__overlay">
          <Button type="button" onClick={toggleModel}>
            Unlock
          </Button>
        </div>
      )}
      {isModel && (
        <>
          <div className="model-overlay"></div>
          <div className="model">
            <form onSubmit={verifyPassword} className="model-container">
              <h4 className="title">Enter Password</h4>
              <FormInput
                className="form-input"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
              <Button type="submit" loading={loading} disabled={loading}>
                Verify
              </Button>
              <MdClear className="clear" size={30} onClick={toggleModel} />
            </form>
          </div>
        </>
      )}
      {isDeleteModel && (
        <YesOrNoModel
          yes={deletePassword}
          no={toggleDeleteModel}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ViewPassword;
