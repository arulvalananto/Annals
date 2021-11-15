import React from "react";
import { useHistory } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import moment from "moment";

import TextEditor from "../components/TextEditor";
import Alerter from "../components/Alerter";
import { useSelector } from "react-redux";

const JournalsAdd = () => {
  const history = useHistory();

  const { success, failure } = useSelector((state) => state.notify);

  return (
    <div className="p-5 h-full w-full">
      <Alerter message={failure} visible={failure} type="error" />
      <Alerter message={success} visible={success} type="success" />
      <p
        className="p-2 bg-tertiary flex items-center justify-center w-10 h-10 text-black rounded transform cursor-pointer hover:scale-90 "
        onClick={() => history.goBack()}
      >
        <ArrowBackIosIcon
          className="transform translate-x-1"
          fontSize="small"
        />
      </p>
      <div className="mt-10 mb-4">
        <h2 className="md:text-5xl text-3xl font-bold select-none">
          {moment(Date.now()).format("LL")}
        </h2>
      </div>
      <div>
        <TextEditor />
      </div>
    </div>
  );
};

export default JournalsAdd;
