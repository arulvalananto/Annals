import React from "react";
import "./YesOrNoModel.style.scss";
// Other Components
import Button from "../Button/Button.component";

const YesOrNoModel = ({ yes, no, loading }) => {
  return (
    <>
      <div className="yesOrNoModel--overlay"></div>
      <div className="yesOrNoModel">
        <form onSubmit={yes} className="yesOrNoModel__form">
          <h4 className="title">Are you sure?</h4>
          <div className="yesOrNoModel__formButtonContainer">
            <Button type="button" onClick={no} disabled={loading}>
              No
            </Button>
            <Button type="submit" loading={loading} disabled={loading}>
              Yes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default YesOrNoModel;
