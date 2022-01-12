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
            className="bg-bglight mb-2 text-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="content" className="text-xs mb-1 text-gray-600">
            Content
          </label>
          <textarea
            className="bg-bglight resize-none h-40 outline-none px-4 py-2 text-lg"
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
