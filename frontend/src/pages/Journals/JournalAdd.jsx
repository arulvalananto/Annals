import React from "react";
import moment from "moment";

import TextEditor from "../../components/TextEditor";
import BackButton from "../../components/BackButton";

const JournalsAdd = () => {
  return (
    <div className="p-5 h-full w-full">
      <BackButton />
      <div className="mt-10 mb-4">
        <h2 className="md:text-5xl text-3xl font-bold select-none">
          {moment(Date.now()).format("LL")}
        </h2>
      </div>
      <TextEditor />
    </div>
  );
};

export default JournalsAdd;
