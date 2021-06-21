import React, { useState } from "react";
import "./GeneratePin.scss";

import axios from "../../axios";
import { fetchUser } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import Model from "../Model/Model";

const GeneratePin = () => {
    const [isOpenModel, setIsOpenModel] = useState(false);

    const intialState = {
        pin: "",
        confirmPin: "",
    };

    const [credentials, setCredentials] = useState(intialState);

    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const toggleModal = () => {
        setIsOpenModel((prevState) => !prevState);
        setError("");
        setCredentials(intialState);
    };

    const submitHandler = async () => {
        const { pin, confirmPin } = credentials;
        if (pin && pin === confirmPin) {
            try {
                const response = await axios.post(
                    "/api/v1/password/generate-pin",
                    {
                        pin,
                    }
                );
                dispatch(fetchUser(response.data));
                toggleModal();
            } catch (err) {
                setError(err.response.data.message);
            }
        } else {
            setError("Please enter valid pin");
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <>
            <div className="password__generateButtonContainer">
                <p className="password__generateText">
                    If you are not generate a common password for all password,
                    click here
                </p>
                <button
                    type="button"
                    className="password__generateButton"
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
                    />
                )}
            </div>
        </>
    );
};

export default GeneratePin;
