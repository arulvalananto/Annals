import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import TextEditor from "../components/TextEditor";
import Alerter from "../components/Alerter";
import BackButton from "../components/BackButton";

const JournalsAdd = () => {
  const { success, failure } = useSelector((state) => state.notify);

  return (
    <div className="p-5 h-full w-full">
      <Alerter message={failure} visible={failure} type="error" />
      <Alerter message={success} visible={success} type="success" />
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
