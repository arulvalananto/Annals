import React from "react";
import { useHistory } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import TextEditor from "../components/TextEditor";

const JournalsAdd = () => {
  const history = useHistory();

  return (
    <div className="p-5">
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
        <p className="md:text-5xl text-3xl font-bold">26 August 2021</p>
        {/* <p className="text-xs text-darkgray mt-3">
          Last edit by 26-10-2021 at 06:30PM
        </p> */}
      </div>
      <div>
        <TextEditor />
      </div>
    </div>
  );
};

export default JournalsAdd;
