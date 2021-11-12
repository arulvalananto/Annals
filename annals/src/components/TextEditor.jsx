import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

import { addJournal } from "../store/actions/journals.action";

const TextEditor = () => {
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => setContent(e.target.value);
  const handleLoading = (val) => setLoading(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addJournal(content, handleLoading));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full bg-transparent bg-bgdark p-2 outline-none rounded resize-none"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={content}
        placeholder="Type here.."
        autoFocus
      />
      {content.trim().length > 0 && (
        <button
          type="submit"
          className="px-4 py-2 bg-secondary rounded transform hover:scale-95  fixed bottom-0 right-0 m-10 mr-20 select-none"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size="20px" color="inherit" />
          ) : (
            "Submit"
          )}
        </button>
      )}
    </form>
  );
};

export default TextEditor;
