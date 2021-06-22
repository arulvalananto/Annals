import React, { useState } from "react";
import "./Password.scss";
// React Router
import { useSelector } from "react-redux";
// React Icons
import { IoAddCircleOutline } from "react-icons/io5";
import { MdSettingsBackupRestore } from "react-icons/md";
// Other Components
import AddPassword from "../../../components/AddPassword/AddPassword";
import ViewPassword from "../../../components/ViewPassword/ViewPassword";
import GeneratePin from "../../../components/GeneratePin/GeneratePin";
// Material UI
import { Tooltip } from "@material-ui/core";
import { ReactComponent as Secure } from "../../../assets/secure.svg";
import axios from "../../../axios";
import Button from "../../../components/Button/Button";

const Password = () => {
  const [show, setShow] = useState("");
  const [passwordDetails, setPasswordDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const passwords = useSelector((state) => state.auth.userData.user.passwords);

  const toggleDetails = (val, data) => {
    setShow(data);
    setPasswordDetails(val);
  };
  const [isOpenChangeModel, setIsOpenChangeModel] = useState(false);

  const toggleChangeModel = () => {
    setIsOpenChangeModel((prevState) => !prevState);
    setShow("");
  };

  const changePin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/password/change-pin");
      setLoading(false);
      setIsOpenChangeModel(false);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      setLoading(false);
    }
  };

  const showContent = () => {
    if (show === "view") {
      return (
        <ViewPassword
          passwordDetails={passwordDetails}
          toggleDetails={toggleDetails}
        />
      );
    } else if (show === "add") {
      return <AddPassword toggleDetails={toggleDetails} />;
    } else {
      return (
        <div className="empty-pageContainer">
          <Secure className="empty-page" />;
        </div>
      );
    }
  };

  return (
    <div>
      {!passwords?.pin ? (
        <GeneratePin />
      ) : (
        <div className="password">
          <div className="password__left">
            <div className="password__leftTop">
              <Tooltip title="Add Password" arrow placement="top">
                <i>
                  <IoAddCircleOutline
                    size="24"
                    onClick={() => {
                      setPasswordDetails("");
                      setShow("add");
                    }}
                  />
                </i>
              </Tooltip>
              <Tooltip title="Change Pin" arrow placement="top">
                <i>
                  <MdSettingsBackupRestore
                    onClick={toggleChangeModel}
                    size="24"
                  />
                </i>
              </Tooltip>
            </div>
            <div className="password__leftBottom">
              {passwords.entries?.map((password) => (
                <div
                  className="password__list"
                  key={password._id}
                  onClick={() => {
                    setPasswordDetails(password);
                    setShow("view");
                  }}
                >
                  <img src="" alt="logo" />
                  <div className="password__details">
                    <span className="password-title">{password.title}</span>
                    <span className="password-link">{password?.link}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="password__right">{showContent()}</div>
          {isOpenChangeModel && (
            <>
              {/* <div className="model-overlay"></div> */}
              <div className="model">
                <form onSubmit={changePin} className="model-delete">
                  <h4 className="title">Are you sure?</h4>
                  <div className="model-button-container">
                    <Button
                      type="button"
                      onClick={toggleChangeModel}
                      disabled={loading}
                    >
                      No
                    </Button>
                    <Button type="submit" loading={loading} disabled={loading}>
                      Yes
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Password;
