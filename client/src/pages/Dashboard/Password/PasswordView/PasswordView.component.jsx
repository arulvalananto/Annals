import React, { useState } from "react";
import "./PasswordView.style.scss";

import YesOrNoModel from "../../../../components/YesOrNoModel/YesOrNoModel.component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectPasswords } from "../../../../redux/reducers/auth.reducer";
import { FiEdit2, FiCopy, FiUnlock, FiLock } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { Tooltip } from "@material-ui/core";
import { deletePassword } from "../../../../redux/actions/user.actions";

const PasswordView = () => {
  const { id } = useParams();

  const initialState = {
    title: "",
    password: "",
    website: "",
  };

  const [info, setInfo] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const toggleEditMode = () => setEditMode(!editMode);
  const toggleDeleteModel = () => setDeleteModel(!deleteModel);
  const toggleLoading = (val) => setLoading(val);

  const passwords = useSelector(selectPasswords);
  const password = passwords.entries.find((entry) => entry._id === id);

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deletePassword(toggleLoading, id, toggleDeleteModel, history));
  };

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
            <img src={password.avatar} alt={password.title} />
            <div>
              <h3>{password.title}</h3>
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
            <input type='text' value={password.username} disabled={!editMode} />
            <Tooltip title='copy clipboard' placement='top' arrow>
              <p className='copy'>
                <FiCopy size={18} />
              </p>
            </Tooltip>
          </div>
          <div className='passwordView__formGroup'>
            <label>password</label>
            <input
              type='password'
              className='password'
              value={password.password}
              disabled={!editMode}
            />
            <Tooltip title='copy clipboard' placement='top' arrow>
              <p className='copy'>
                <FiCopy size={18} />
              </p>
            </Tooltip>
            <Tooltip title='unlock password' placement='top' arrow>
              <p className='lock'>
                <FiUnlock size={18} />
              </p>
            </Tooltip>
          </div>
          <div className='passwordView__formGroup'>
            <label>Website</label>
            <input type='url' value={password.link} disabled={!editMode} />
            <Tooltip title='copy clipboard' placement='top' arrow>
              <p className='copy'>
                <FiCopy size={18} />
              </p>
            </Tooltip>
            <Tooltip title='goto website' placement='top' arrow>
              <p className='redirect'>
                <RiShareForwardLine size={18} />
              </p>
            </Tooltip>
          </div>
          <div className='passwordView__formStatistics'>
            <div className='passwordView__formStatisticsGroup'>
              <h3>{password.passwordStrength}%</h3>
              <p>Password Strength</p>
            </div>
            <div className='passwordView__formStatisticsGroup'>
              <h3>{password.risk}</h3>
              <p>Risk</p>
            </div>
            <div className='passwordView__formStatisticsGroup'>
              <h3>{new Date(password.updatedAt).toLocaleDateString()}</h3>
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
        />
      )}
    </div>
  );
};

export default PasswordView;
