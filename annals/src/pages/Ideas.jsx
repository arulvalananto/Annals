import React, { useState } from "react";
import { useSelector } from "react-redux";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Tooltip } from "@mui/material";

const Ideas = () => {
  const [idea, setIdea] = useState({
    title: "",
    content: "",
  });

  const ideas = useSelector((state) => state.ideas);
  const { isLoading } = useSelector((state) => state.loader);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdea({ ...idea, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-screen m-2 mx-5 md:m-0 md:w-1/2 relative"
        >
          <input
            className="p-2 pl-4 bg-bglight w-full rounded-sm pr-10 outline-none"
            name="title"
            onChange={handleChange}
            placeholder="Type title of idea"
            type="text"
            value={idea.title}
          />
          <textarea
            className={`absolute w-full top-11 left-0 resize-none text-white bg-bglight outline-none p-4 h-36 ${
              idea.title ? "block" : "hidden"
            }`}
            name="content"
            onChange={handleChange}
            placeholder="Enter Your Idea"
            value={idea.content}
          />
          <Tooltip title="Submit">
            <button
              className={`absolute top-1.5 right-2 transform hover:scale-95 ${
                idea.title && idea.content && !isLoading ? "block" : "hidden"
              }`}
              type="submit"
            >
              <DoubleArrowIcon />
            </button>
          </Tooltip>
        </form>
      </div>
      <div className="">
        {ideas?.map((idea) => (
          <div>{idea?.title}</div>
        ))}
      </div>
      <div
        className="bg-mildgray w-72 p-4 h-auto m-3 border-l-4"
        style={{ borderColor: "olivedrab" }}
      >
        <p className="font-jura text-gray-400" style={{ color: "olivedrab" }}>
          01
        </p>
        <h3 className="text-xl font-bold mb-2">Item Title</h3>
        <p className="text-sm">How are you?? jhkjasdhkjhas sahdkjh</p>
      </div>
    </div>
  );
};

export default Ideas;
