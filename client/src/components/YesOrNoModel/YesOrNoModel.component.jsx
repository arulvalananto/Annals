import React from "react";
import "./YesOrNoModel.style.scss";
// Other Components
import Button from "../Button/Button.component";
import { AiOutlineDelete } from "react-icons/ai";

const YesOrNoModel = ({ yes, no, loading, title }) => {
  return (
    <>
      <div className='yesOrNoModel--overlay'></div>
      <div className='yesOrNoModel'>
        <form onSubmit={yes} className='yesOrNoModel__form'>
          <p className='icon'>
            <AiOutlineDelete size={18} />
          </p>
          <h4 className='title'>Delete {title}</h4>
          <p className='subtitle'>This action can't be undone</p>
          <div className='yesOrNoModel__formButtonContainer'>
            <Button type='button' onClick={no} disabled={loading}>
              Cancel
            </Button>
            <Button type='submit' loading={loading} disabled={loading}>
              Delete
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default YesOrNoModel;
