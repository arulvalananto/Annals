import React, { useState } from "react";
import "./GeneratePin.style.scss";
// Reducers
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/reducers/auth.reducer";
import {
  clearFailureMessage,
  setFailureMessage,
} from "../../redux/reducers/message.reducer";
// Other Component
import Model from "../Model/Model.component";

const GeneratePin = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);

  const intialState = {
    pin: "",
    confirmPin: "",
  };

  const [credentials, setCredentials] = useState(intialState);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.message.failure);

  const toggleModal = () => {
    setIsOpenModel((prevState) => !prevState);
    dispatch(clearFailureMessage());
    setCredentials(intialState);
  };

  const submitHandler = async () => {
    const { pin, confirmPin } = credentials;
    if (pin && pin === confirmPin) {
      try {
        setLoading(true);
        const response = await axios.post("/api/v1/password/generate-pin", {
          pin,
        });
        console.log(response);
        dispatch(fetchUser(response.data));
        toggleModal();
        setLoading(false);
      } catch (err) {
        dispatch(setFailureMessage(err.response.data.message));
        setLoading(false);
      }
    } else {
      dispatch(setFailureMessage("Please enter valid pin"));
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <div className="generatePin">
        <p className="generatePin__info">
          If you are not generate a common password for all password, click here
        </p>
        <button
          type="button"
          className="generatePin__button"
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
