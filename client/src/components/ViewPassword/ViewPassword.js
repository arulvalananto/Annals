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
import { fetchUser } from "../../features/authSlice";
import { useDispatch } from "react-redux";

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

    // const [errors, setErrors] = useState({});
    const [verifiedPassword, setVerifiedPassword] = useState("");
    const [verify, setVerify] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const toggleModel = () => {
        setIsOpenModel((prevState) => !prevState);
    };

    const toggleVisiblePassword = () => {
        setIsVisible((prevState) => !prevState);
    };

    const toggleDeleteModel = () => {
        setIsOpenDeleteModel((prevState) => !prevState);
    };

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
            setVerify(true);
            setVerifiedPassword(response.data.decryptPassword);
            setIsOpenModel(false);
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
            setIsOpenDeleteModel(false);
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
                        className="password__back"
                        onClick={() => toggleDetails("", "")}
                    >
                        Back
                    </button>
                    <MdDelete onClick={toggleDeleteModel} size="26" />
                </div>
                <h3 className="password__title">Password Details</h3>
                <form className="password__form">
                    {INPUT_DATA?.map((name) => (
                        <div className="password__inputsContainer" key={name}>
                            <div className="password__inputContainer">
                                <label className="password__label">
                                    {name}
                                </label>
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
                                            <MdVisibility
                                                onClick={toggleVisiblePassword}
                                            />
                                        ) : (
                                            <MdVisibilityOff
                                                onClick={toggleVisiblePassword}
                                            />
                                        )}
                                    </p>
                                )}
                            </div>
                            {/* {errors[name] && (
                                <p className="password__error">
                                    {errors[name]}
                                </p>
                            )} */}
                        </div>
                    ))}
                    <div className="password__progressContainer">
                        <label className="password__label">
                            Password Strength
                        </label>
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
                <div className="overlay">
                    <Button onClick={toggleModel}>Unlock</Button>
                </div>
            )}
            {isOpenModel && (
                <>
                    <div className="model-overlay"></div>
                    <div className="model">
                        <form
                            onSubmit={verifyPassword}
                            className="model-container"
                        >
                            <h4 className="title">Enter Password</h4>
                            <FormInput
                                className="form-input"
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                required
                            />
                            <Button
                                type="submit"
                                loading={loading}
                                disabled={loading}
                            >
                                Verify
                            </Button>
                            <MdClear
                                className="clear"
                                size="26"
                                onClick={toggleModel}
                            />
                        </form>
                    </div>
                </>
            )}
            {isOpenDeleteModel && (
                <>
                    <div className="model-overlay"></div>
                    <div className="model">
                        <form
                            onSubmit={deletePassword}
                            className="model-delete"
                        >
                            <h4 className="title">Are you sure?</h4>
                            <div className="model-button-container">
                                <Button
                                    onClick={toggleDeleteModel}
                                    disabled={loading}
                                >
                                    No
                                </Button>
                                <Button
                                    type="submit"
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Yes
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewPassword;
