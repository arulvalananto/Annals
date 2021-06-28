import React, { useEffect, useRef, useState } from "react";
import "./Idea.scss";

import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { MdCancel, MdDone } from "react-icons/md";

import randomColor from "../../utils/randomColor";

const Idea = ({
  idea: { _id, title, content },
  editHandler,
  deleteHandler,
}) => {
  const [editMode, setEditMode] = useState(false);

  const editRef = useRef();

  useEffect(() => {
    if (editMode) {
      editRef.current.selectionStart = editRef.current.value.length;
      editRef.current.selectionEnd = editRef.current.value.length;
      editRef.current.focus();
    }
  }, [editMode, editRef]);

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const [updateContent, setUpdateContent] = useState(content);

  return (
    <div
      className="idea"
      style={{ borderLeft: `4px solid ${randomColor()}` }}
      key={_id}
    >
      <span className="idea__content">
        <h4 className="title">{title}</h4>
        {!editMode ? (
          <p>{content}</p>
        ) : (
          <textarea
            onKeyDown={handleKeyDown}
            ref={editRef}
            className="editField"
            value={updateContent}
            onChange={(e) => setUpdateContent(e.target.value)}
          />
        )}
      </span>
      <div
        className="idea__tools"
        style={{ display: `${editMode && "block"}` }}
      >
        {editMode ? (
          <>
            <span className="no">
              <MdCancel
                onClick={() => {
                  setUpdateContent(content);
                  setEditMode(!editMode);
                }}
              />
            </span>
            <span className="yes">
              <MdDone
                onClick={() => editHandler(_id, content, updateContent)}
              />
            </span>
          </>
        ) : (
          <>
            <span className="edit">
              <FiEdit2 onClick={() => setEditMode(!editMode)} />
            </span>
            <span className="delete">
              <AiOutlineDelete onClick={() => deleteHandler(_id)} />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Idea);
