import React, { useState } from "react";
import "./GeneratePin.style.scss";
// Reducers
import { useDispatch, useSelector } from "react-redux";
import {
  clearFailureMessage,
  selectMessage,
  setFailureMessage,
} from "../../redux/reducers/message.reducer";
// Other Component
import Model from "../Model/Model.component";
import { generatePin } from "../../redux/actions/user.actions";

const GeneratePin = () => {
  const initialState = {
    pin: "",
    confirmPin: "",
  };

  const [credentials, setCredentials] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);

  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  const toggleModal = () => {
    setIsOpenModel(!isOpenModel);
    dispatch(clearFailureMessage());
    setCredentials(initialState);
  };

  const toggleLoading = (val) => setLoading(val);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const submitHandler = async () => {
    const { pin, confirmPin } = credentials;

    if (pin && pin === confirmPin) {
      dispatch(generatePin(toggleLoading, toggleModal, pin));
    } else {
      dispatch(setFailureMessage("Please enter valid pin"));
    }
  };

  return (
    <>
      <div className='generatePin'>
        <p className='generatePin__info'>
          If you are not generate a common password for all password, click here
        </p>
        <button
          type='button'
          className='generatePin__button'
          onClick={toggleModal}>
          Generate Pin
        </button>
      </div>
      <div>
        {isOpenModel && (
          <Model
            submitHandler={submitHandler}
            error={message.failure}
            toggleModal={toggleModal}
            handleChange={changeHandler}
            loading={loading}
          />
        )}
      </div>
    </>
  );
};

export default GeneratePin;
