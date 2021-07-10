import React, { useState } from "react";
import "./Password.style.scss";
// React Router
import { useDispatch, useSelector } from "react-redux";
// React Icons
import { IoAddCircleOutline } from "react-icons/io5";
import { MdSettingsBackupRestore } from "react-icons/md";
// Other Components
import AddPassword from "../../../components/AddPassword/AddPassword.component";
import ViewPassword from "../../../components/ViewPassword/ViewPassword.component";
import GeneratePin from "../../../components/GeneratePin/GeneratePin.component";
import YesOrNoModel from "../../../components/YesOrNoModel/YesOrNoModel.component";
// Material UI
import { Tooltip } from "@material-ui/core";
//  Axios
import axios from "../../../axios";
// Reducers
import { setFailureMessage } from "../../../redux/reducers/message.reducer";

const Password = () => {
  const [show, setShow] = useState("");
  const [passwordDetails, setPasswordDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const passwords = useSelector((state) => state.auth.user.passwords);

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
      await axios.get("/api/v1/password/change-pin");
      setLoading(false);
      setIsOpenChangeModel(false);
    } catch (err) {
      if (err.response) {
        dispatch(setFailureMessage(err.response.data.message));
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
                  className="password__leftBottomPasswordList"
                  key={password._id}
                  onClick={() => {
                    setPasswordDetails(password);
                    setShow("view");
                  }}
                >
                  <img
                    className="password__leftBottomPasswordLogo"
                    src={password.avatar}
                    alt="logo"
                  />
                  <div className="password__leftBottomPasswordDetails">
                    <span className="title">{password.title}</span>
                    <span className="link">{password?.link}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="password__right">{showContent()}</div>
          {isOpenChangeModel && (
            <YesOrNoModel
              yes={changePin}
              no={toggleChangeModel}
              loading={loading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Password;
