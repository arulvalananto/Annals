import React from "react";
import { useParams, useHistory } from "react-router";
import moment from "moment";

import TextEditor from "../../components/TextEditor";
import { useSelector } from "react-redux";
import BackButton from "../../components/BackButton";

const JournalView = () => {
  const { id } = useParams();
  const history = useHistory();

  const { docs, synced } = useSelector((state) => state.journals);
  const journal = docs.filter((journal) => journal.id === id)[0];

  if (!synced) {
    history.push("/journals");
    return null;
  }

  return (
    <div className="p-5 h-full w-full">
      <BackButton />
      <div className="mt-10 mb-4">
        <h2 className="md:text-5xl text-3xl font-bold select-none">
          {moment(journal?.date).format("LL")}
        </h2>
      </div>
      <TextEditor mode="view" contentText={journal.content} />
    </div>
  );
};

export default JournalView;
