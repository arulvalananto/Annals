import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import { fetchIdeas, addIdea, deleteIdea } from "../../store/actions/ideas.action";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import { classNames } from "../../utils/helpers";
import UpdateIdeaDrawer from "../../components/UpdateIdeaDrawer";

const initialState = {
  title: "",
  content: "",
};

const Ideas = () => {
  const [idea, setIdea] = useState(initialState);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");

  const ideas = useSelector((state) => state.ideas);
  const { isLoading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIdeas());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {}, [ideas]);

  const clearFields = () => setIdea(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdea({ ...idea, [name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(addIdea(idea, clearFields));
  };

  const handleDeleteMode = (id = "") => {
    setSelectedDeleteId(id);
    setIsDeleteMode(!isDeleteMode);
  };

  const handleDelete = () => {
    dispatch(deleteIdea(selectedDeleteId));
    handleDeleteMode();
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-10">
        <form
          onSubmit={handleCreate}
          className="w-screen m-2 mx-5 md:m-0 md:w-1/2 relative"
        >
          <input
            className="p-2 pl-4 bg-bglight w-full z-10 rounded-sm pr-10 outline-none"
            name="title"
            onChange={handleChange}
            placeholder="Type title of idea"
            type="text"
            value={idea.title}
          />
          <textarea
            className={`absolute w-full top-11 left-0 z-10 resize-none text-white bg-bglight outline-none p-4 h-36 shadow-md ${classNames(
              idea.title,
              "block",
              "hidden"
            )}`}
            name="content"
            onChange={handleChange}
            placeholder="Enter Your Idea"
            value={idea.content}
          />
          <Tooltip title="Submit">
            <button
              className={`absolute top-1.5 right-2 transform hover:scale-95 text-secondary ${classNames(
                idea.title && idea.content && !isLoading,
                "block",
                "hidden"
              )}`}
              type="submit"
            >
              <DoubleArrowIcon />
            </button>
          </Tooltip>
        </form>
      </div>
      <div className="card-columns columns-5-lg columns-4-md columns-3-sm mt-10">
        {ideas?.map(({ color, title, content, id }, index) => (
          <div
            key={index}
            className="bg-mildgray card card-content w-72 p-4 h-auto m-3 border-l-4 col-span-1 relative"
            style={{ borderColor: color }}
          >
            <p className="font-jura text-gray-400" style={{ color }}>
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </p>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm break-words">{content}</p>
            <div className="flex items-center mt-2">
              <UpdateIdeaDrawer selectedId={id} />
              <DeleteForeverIcon
                fontSize="14px"
                className="ml-2 hover:text-red-500 transform hover:scale-105"
                onClick={() => handleDeleteMode(id)}
              />
            </div>
          </div>
        ))}
      </div>
      <DeleteConfirmModal
        yes={handleDelete}
        no={() => handleDeleteMode()}
        visible={isDeleteMode}
      />
    </div>
  );
};

export default Ideas;
