import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import BackButton from "../..//components/BackButton";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import { deletePersonalData } from "../../store/actions/personal.actions";

const PersonalTemplate = ({ title, value, name, Component }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const personal = useSelector((state) => state.personal);
  const data = personal[value];

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [pickedId, setPickedId] = useState("");

  const handleDeleteMode = (id = "") => {
    setPickedId(id);
    setIsDeleteMode(!isDeleteMode);
  };

  const handleDelete = () => {
    setIsDeleteMode(!isDeleteMode);
    dispatch(deletePersonalData(setIsLoading, pickedId, name, setPickedId));
  };

  if (!data.length) {
    history.push("/personal");
  }

  return (
    <div className="p-1 sm:p-5">
      <BackButton />
      <div className="flex items-center gap-4">
        <h2 className="font-bold text-3xl my-5 capitalize">{title}</h2>
        {isLoading && <CircularProgress size="1rem" color="inherit" />}
      </div>
      <Component handleDeleteMode={handleDeleteMode} />
      <DeleteConfirmModal
        yes={handleDelete}
        no={() => handleDeleteMode()}
        visible={isDeleteMode}
      />
    </div>
  );
};

export default PersonalTemplate;