import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

import { addJournal, updateJournal } from "../store/actions/journals.action";

const TextEditor = ({ mode = "", contentText = "" }) => {
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const [content, setContent] = useState(contentText);
  const [loading, setLoading] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => setContent(e.target.value);
  const handleLoading = (val) => setLoading(val);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateJournal(content, handleLoading));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addJournal(content, handleLoading));
  };

  return (
    <form onSubmit={mode === "edit" ? handleUpdate : handleSubmit}>
      <textarea
        className={`w-full bg-transparent bg-bgdark p-2 outline-none rounded resize-none ${
          mode && "h-screen"
        }`}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={content}
        placeholder="Type here.."
        autoFocus
        disabled={mode === "view"}
      />
      {mode !== "view" && content.trim().length > 0 ? (
        <button
          type="submit"
          className="px-4 py-2 bg-secondary rounded transform hover:scale-95  fixed bottom-0 right-0 m-10 mr-20 select-none"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size="20px" color="inherit" />
          ) : mode === "edit" ? (
            "Update"
          ) : (
            "Submit"
          )}
        </button>
      ) : null}
    </form>
  );
};

export default TextEditor;
