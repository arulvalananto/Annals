import React from "react";
import "./Model.scss";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

const Model = ({ handleChange, toggleModal, submitHandler, error }) => {
    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__header">
                    <h3>Create Pin</h3>
                    {/* <Tooltip
                        title="Cancel"
                        arrow
                        placement="top"
                        onClick={toggleModal}
                    >
                        <i>
                            <GiCancel size="24" />
                        </i>
                    </Tooltip> */}
                </div>
                <div className="modal__body">
                    <FormInput
                        type="password"
                        placeholder="Pin"
                        onChange={handleChange}
                        name="pin"
                        autoComplete="off"
                        className="form-input"
                    />
                    <FormInput
                        type="password"
                        placeholder="Re-type Pin"
                        name="confirmPin"
                        onChange={handleChange}
                        autoComplete="off"
                        error={error}
                        className="form-input"
                    />
                </div>
                <div className="modal__footer">
                    <Button inverted onClick={toggleModal}>Cancel</Button>
                    <Button onClick={submitHandler}>Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default Model;
