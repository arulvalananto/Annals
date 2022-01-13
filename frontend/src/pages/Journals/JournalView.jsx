import React from "react";
import { useParams } from "react-router";
import moment from "moment";

import TextEditor from "../../components/TextEditor";
import { useSelector } from "react-redux";
import BackButton from "../../components/BackButton";

const JournalView = () => {
  const { id } = useParams();

  const journals = useSelector((state) => state.journals);
  const journal = journals.filter((journal) => journal.id === id)[0];

  return (
    <div className="p-5 h-full w-full">
      <BackButton />
      <div className="mt-10 mb-4">
        <h2 className="md:text-5xl text-3xl font-bold select-none">
          {moment(journal.date).format("LL")}
        </h2>
      </div>
      <TextEditor mode="view" contentText={journal.content} />
    </div>
  );
};

export default JournalView;
