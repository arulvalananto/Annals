import React, { useState } from "react";
import "./AddPage.scss";
// Other Components
import TextEditor from "../TextEditor/TextEditor";

import { weeks, months } from "../../utils/dates";

import { useHistory } from "react-router-dom";

import Button from "../Button/Button";

import axios from "../../axios";

import { fetchUser } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const date = new Date(Date.now());
const week = weeks[date.getDay() - 1];
const month = months[date.getMonth()];
const day = date.getDate();
const year = date.getFullYear();

const AddPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const changeHandler = (val) => {
        setContent(val);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/v1/add-timeline", {
                content,
            });

            if (response.data) {
                dispatch(fetchUser(response.data));
            }
            setLoading(false);
            history.push("/diary");
        } catch (err) {
            if (err.response) {
                alert(err.response?.data.message);
                history.push("/diary");
            }
            setLoading(false);
        }
    };

    return (
        <div className="addPage">
            <div className="addPage__top">
                <button
                    className="addPage__topButton addPage__topBackButton"
                    onClick={() => history.goBack()}
                    disabled={loading}
                >
                    Back
                </button>
                <p className="addPage__topDate">
                    {week}, {day} {month} {year}
                </p>
                <Button
                    className="addPage__topButton"
                    loading={loading}
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
            <TextEditor body={content} changeHandler={changeHandler} />
        </div>
    );
};

export default AddPage;
