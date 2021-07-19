import React, { useState } from "react";
import "./Password.style.scss";
// Reducers
import { useDispatch, useSelector } from "react-redux";
import { selectPasswords } from "../../../redux/reducers/auth.reducer";
import { changeCommonPin } from "../../../redux/actions/user.actions";
// React Icons
import { IoAddCircleOutline } from "react-icons/io5";
import { MdSettingsBackupRestore } from "react-icons/md";
// Other Components
import PasswordAdd from "../../../components/PasswordAdd/PasswordAdd.component";
import PasswordView from "../../../components/PasswordView/PasswordView.component";
import GeneratePin from "../../../components/GeneratePin/GeneratePin.component";
import YesOrNoModel from "../../../components/YesOrNoModel/YesOrNoModel.component";
// Material UI
import { Tooltip } from "@material-ui/core";

const Password = () => {
  const [show, setShow] = useState("");
  const [passwordDetails, setPasswordDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const passwords = useSelector(selectPasswords);

  const toggleDetails = (val, data) => {
    setShow(data);
    setPasswordDetails(val);
  };
  const [isOpenChangeModel, setIsOpenChangeModel] = useState(false);

  const toggleChangeModel = () => {
    setIsOpenChangeModel(!isOpenChangeModel);
    setShow("");
  };
  const toggleLoading = (val) => setLoading(val);

  const changePin = async (e) => {
    e.preventDefault();
    dispatch(changeCommonPin(toggleLoading, toggleChangeModel));
  };

  const showContent = () => {
    if (show === "view") {
      return (
        <PasswordView
          passwordDetails={passwordDetails}
          toggleDetails={toggleDetails}
        />
      );
    } else if (show === "add") {
      return <PasswordAdd toggleDetails={toggleDetails} />;
    }
  };

  return (
    <div>
      {!passwords?.pin ? (
        <GeneratePin />
      ) : (
        <div className='password'>
          <div className='password__left'>
            <div className='password__leftTop'>
              <Tooltip title='Add Password' arrow placement='top'>
                <i>
                  <IoAddCircleOutline
                    size='24'
                    onClick={() => {
                      setPasswordDetails("");
                      setShow("add");
                    }}
                  />
                </i>
              </Tooltip>
              <Tooltip title='Change Pin' arrow placement='top'>
                <i>
                  <MdSettingsBackupRestore
                    onClick={toggleChangeModel}
                    size='24'
                  />
                </i>
              </Tooltip>
            </div>
            <div className='password__leftBottom'>
              {passwords.entries?.map((password) => (
                <div
                  className='password__leftBottomPasswordList'
                  key={password._id}
                  onClick={() => {
                    setPasswordDetails(password);
                    setShow("view");
                  }}>
                  <img
                    className='password__leftBottomPasswordLogo'
                    src={password.avatar}
                    alt='logo'
                  />
                  <div className='password__leftBottomPasswordDetails'>
                    <span className='title'>{password.title}</span>
                    <span className='link'>{password?.link}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='password__right'>{showContent()}</div>
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
