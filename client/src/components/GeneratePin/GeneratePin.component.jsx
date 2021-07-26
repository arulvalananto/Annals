import React, { useState } from "react";
import "./GeneratePin.style.scss";
// Reducers
import { useDispatch } from "react-redux";
import { clearFailureMessage } from "../../redux/reducers/message.reducer";
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
  const [error, setError] = useState("");

  const dispatch = useDispatch();

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
    setError("");
    const { pin, confirmPin } = credentials;

    if (pin && pin === confirmPin) {
      dispatch(generatePin(toggleLoading, toggleModal, pin));
    } else {
      setError("Please enter valid pin");
    }
  };

  return (
    <>
      <div className='generatePin'>
        <button
          type='button'
          className='generatePin__button'
          onClick={toggleModal}
        >
          Generate Pin
        </button>
      </div>
      <div>
        {isOpenModel && (
          <Model
            submitHandler={submitHandler}
            error={error}
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
