import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";

import Drawer from "../components/Drawer";
import { updateIdea } from "../store/actions/ideas.action";

const UpdateIdeaDrawer = ({ selectedId }) => {
  const ideas = useSelector((state) => state.ideas);

  const selectedIdea = ideas.find((idea) => idea.id === selectedId);
  const dispatch = useDispatch();

  const [idea, setIdea] = useState({
    title: selectedIdea?.title,
    content: selectedIdea?.content,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdea({ ...idea, [name]: value });
  };

  const handleUpdate = () => dispatch(updateIdea(selectedId, idea));

  return (
    <Drawer
      Icon={EditIcon}
      fontSize="14px"
      className="hover:text-yellow-500 transform hover:scale-105 w-10"
      submit
      onSubmit={handleUpdate}
    >
      <h3 className="p-5 text-3xl font-bold uppercase">Update Idea</h3>
      <div className="flex flex-col p-5 w-64  sm:w-96">
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="text-xs mb-1 text-gray-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={idea.title}
            onChange={handleChange}
            className="px-4 py-3 text-sm bg-bgdark outline-none transition-all focus:border-primary border-2 border-opacity-0 rounded focus:border-opacity-100"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="content" className="text-xs mb-1 text-gray-600">
            Content
          </label>
          <textarea
            className="resize-none px-4 py-3 text-sm bg-bgdark outline-none transition-all focus:border-primary border-2 border-opacity-0 rounded focus:border-opacity-100"
            value={idea.content}
            name="content"
            onChange={handleChange}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default UpdateIdeaDrawer;
