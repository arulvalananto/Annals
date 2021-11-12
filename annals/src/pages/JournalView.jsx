import React from "react";
import { useHistory, useParams } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import moment from "moment";

import TextEditor from "../components/TextEditor";
import { useSelector } from "react-redux";

const JournalView = () => {
  const history = useHistory();
  const { id } = useParams();

  const journals = useSelector((state) => state.journals);
  const journal = journals.filter((journal) => journal.id === id)[0];

  console.log(journal);

  return (
    <div className="p-5 h-full w-full">
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
          {moment(journal.date).format("LL")}
        </h2>
      </div>
      <div>
        <TextEditor mode="view" contentText={journal.content} />
      </div>
    </div>
  );
};

export default JournalView;
