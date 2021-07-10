import React from "react";
import "./Model.style.scss";
// Other Components
import FormInput from "../FormInput/FormInput.component";
import Button from "../Button/Button.component";

const Model = ({
  handleChange,
  toggleModal,
  submitHandler,
  error,
  loading,
}) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__header">
          <h3>Create Pin</h3>
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
          <Button type="button" inverted onClick={toggleModal}>
            Cancel
          </Button>
          <Button type="submit" onClick={submitHandler} loading={loading}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Model;
