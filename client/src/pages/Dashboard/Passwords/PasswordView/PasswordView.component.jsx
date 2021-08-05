import React, { useRef, useState } from "react";
import "./PasswordView.style.scss";

import YesOrNoModel from "../../../../components/YesOrNoModel/YesOrNoModel.component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams, Route } from "react-router-dom";
import { selectPasswords } from "../../../../redux/reducers/auth.reducer";
import { FiEdit2, FiCopy, FiUnlock, FiLock } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { Tooltip, CircularProgress } from "@material-ui/core";
import {
  deletePassword,
  verifyPin,
} from "../../../../redux/actions/user.actions";
import {
  setFailureMessage,
  setSuccessMessage,
} from "../../../../redux/reducers/message.reducer";

const PasswordView = () => {
  const { id } = useParams();

  const passwords = useSelector(selectPasswords);
  const password = passwords.entries.find((entry) => entry._id === id);

  const initialState = {
    username: password?.username,
    password: password?.password,
    link: password?.link,
  };

  const usernameRef = useRef();
  const passwordRef = useRef();
  const websiteRef = useRef();

  const [info, setInfo] = useState(initialState);
  const [pin, setPin] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [unlockModel, setUnlockModel] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const toggleEditMode = () => setEditMode(!editMode);
  const toggleDeleteModel = () => setDeleteModel(!deleteModel);
  const toggleLoading = (val) => setLoading(val);
  const unlockHandler = (val) => {
    setUnlockModel(val);
    setIsUnlocked(!val);
  };

  const verifiedPasswordHandler = (val) => {
    setInfo({ ...info, password: val });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setInfo({ ...info, [name]: value });
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deletePassword(toggleLoading, id, toggleDeleteModel, history));
  };

  const verifyPasswordHandler = (e) => {
    e.preventDefault();
    if (!pin || pin.trim().length === 0) {
      dispatch(setFailureMessage("Please enter valid pin"));
      return;
    }
    dispatch(
      verifyPin(
        password.password,
        pin,
        verifiedPasswordHandler,
        toggleLoading,
        unlockHandler
      )
    );
  };

  const copyToClipboardHandler = (ref) => {
    const copyText = ref.current.value;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          dispatch(setSuccessMessage("Copied"));
          setTimeout(() => {
            dispatch(setSuccessMessage(""));
          }, 2000);
        })
        .catch((err) => {
          dispatch(setFailureMessage(err));
        });
    }
  };

  if (!password) {
    return (
      <p className='passwordView--empty'>
        Something Wrong<Link to='/passwords'> Redirect here</Link>
      </p>
    );
  }

  return (
    <div className='passwordView'>
      <div className='passwordView__header'>
        <button
          type='button'
          className='passwordView__headerButton'
          onClick={toggleEditMode}
        >
          <FiEdit2 />
          <span>Edit</span>
        </button>
        <button
          type='button'
          className='passwordView__headerButton passwordView__headerButton--invert'
          onClick={toggleDeleteModel}
        >
          <MdDelete />
          <span>Delete</span>
        </button>
      </div>
      <div className='passwordView__body'>
        <div className='passwordView__bodyTop'>
          <div className='passwordView__bodyTopLeft'>
            {password?.avatar && (
              <img src={password?.avatar} alt={password?.title} />
            )}
            <div>
              <h3>{password?.title}</h3>
              <p>Login</p>
            </div>
          </div>
          <div className='passwordView__bodyTopRight'>
            <AiOutlineStar size={20} />
          </div>
        </div>
        <form className='passwordView__form'>
          <div className='passwordView__formGroup'>
            <label>username</label>
            <input
              type='text'
              value={info.username}
              disabled={!editMode && !isUnlocked}
              ref={usernameRef}
              name='username'
              onChange={changeHandler}
            />
            <Tooltip title='copy clipboard' placement='top' arrow>
              <p className='copy'>
                <FiCopy
                  size={18}
                  onClick={() => copyToClipboardHandler(usernameRef)}
                />
              </p>
            </Tooltip>
          </div>
          <div className='passwordView__formGroup'>
            <label>password</label>
            <input
              type={isUnlocked ? "text" : "password"}
              className='password'
              value={info.password}
              disabled={!editMode}
              ref={passwordRef}
              name='password'
              onChange={changeHandler}
            />
            {isUnlocked && (
              <Tooltip title='copy clipboard' placement='top' arrow>
                <p className='copy'>
                  <FiCopy
                    size={18}
                    onClick={() => copyToClipboardHandler(passwordRef)}
                  />
                </p>
              </Tooltip>
            )}
            <Tooltip title='unlock password' placement='top' arrow>
              <p className='lock'>
                {isUnlocked ? (
                  <FiUnlock size={18} />
                ) : (
                  <FiLock size={18} onClick={() => unlockHandler(true)} />
                )}
              </p>
            </Tooltip>
          </div>
          <div className='passwordView__formGroup'>
            <label>Website</label>
            <input
              type='url'
              value={info.link}
              disabled={!editMode}
              ref={websiteRef}
              name='link'
              onChange={changeHandler}
            />
            <Tooltip title='copy clipboard' placement='top' arrow>
              <p className='copy'>
                <FiCopy
                  size={18}
                  onClick={() => copyToClipboardHandler(websiteRef)}
                />
              </p>
            </Tooltip>
            <Tooltip title='goto website' placement='top' arrow>
              <Route
                exact
                path='/'
                render={() => (window.location = password?.link)}
              >
                <RiShareForwardLine size={18} />
              </Route>
            </Tooltip>
          </div>
          <div className='passwordView__formStatistics'>
            <div className='passwordView__formStatisticsGroup'>
              <h3>{password?.passwordStrength}%</h3>
              <p>Password Strength</p>
            </div>
            <div className='passwordView__formStatisticsGroup'>
              <h3>{password?.risk}</h3>
              <p>Risk</p>
            </div>
            <div className='passwordView__formStatisticsGroup'>
              <h3>{new Date(password?.updatedAt).toLocaleDateString()}</h3>
              <p>Last Updated</p>
            </div>
          </div>
          {editMode && (
            <div className='passwordView__formButtonGroup'>
              <button type='button'>cancel</button>
              <button type='submit'>submit</button>
            </div>
          )}
        </form>
      </div>
      {deleteModel && (
        <YesOrNoModel
          yes={deleteHandler}
          no={toggleDeleteModel}
          loading={loading}
          title='Password'
        />
      )}
      {unlockModel && (
        <div className='unlockModel'>
          <form onSubmit={verifyPasswordHandler} className='unlockModel__form'>
            <div className='unlockModel__formGroup'>
              <input
                type='text'
                name='password'
                onChange={(e) => setPin(e.target.value)}
                placeholder='password'
              />
            </div>
            <div className='unlockModel__formButtonGroup'>
              <button type='button' onClick={() => unlockHandler(false)}>
                Cancel
              </button>
              {loading ? (
                <CircularProgress color='inherit' size={16} />
              ) : (
                <button type='submit'>Unlock</button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordView;
