import React, { useEffect, useRef, useState } from "react";
import "./TodoList.style.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectTodos, todoAdded } from "../../../redux/reducers/auth.reducer";
import { setFailureMessage } from "../../../redux/reducers/message.reducer";

import { IoAdd } from "react-icons/io5";
import { GoChevronRight } from "react-icons/go";
import { GrSubtract } from "react-icons/gr";
import { CircularProgress, Tooltip } from "@material-ui/core";

import axios from "../../../axios";

const TodoList = () => {
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const dragOver = (e) => {};

  const dragStart = (e) => {};

  const contentRef = useRef();

  const todos = useSelector((state) => selectTodos(state));

  useEffect(() => {
    if (editMode) {
      contentRef.current.selectionStart = contentRef.current.value.length;
      contentRef.current.selectionEnd = contentRef.current.value.length;
      contentRef.current.focus();
    }
  }, [editMode, contentRef]);

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/todos/add", { content });
      dispatch(todoAdded(res?.data));
      setEditMode(!editMode);
      setContent("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setFailureMessage(err.response?.data);
    }
  };

  const renderInput = () => {
    if (editMode) {
      return (
        <form onSubmit={handleSubmit} className='todoList__AddContent'>
          <textarea
            onKeyDown={handleKeyDown}
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Type here..'
            required
          />
          {content.trim() && (
            <Tooltip title='submit' arrow placement='right'>
              <button>
                {loading ? (
                  <CircularProgress size={14} color='inherit' />
                ) : (
                  <GoChevronRight size={18} />
                )}
              </button>
            </Tooltip>
          )}
        </form>
      );
    }
  };

  return (
    <div className='todoList'>
      <div className='todoList__do'>
        <div className='todoList__doHeader'>
          <h3 className='todoList__doTitle'>To do</h3>
          <p className='todoList__doCount'>0</p>
        </div>
        <Tooltip title={editMode ? "close" : "add"} arrow placement='top'>
          <p
            className='todoList__doAddButton'
            onClick={() => setEditMode(!editMode)}>
            {editMode ? <GrSubtract size={20} /> : <IoAdd size={20} />}
          </p>
        </Tooltip>
        <div>{renderInput()}</div>
        <div className='todoList__doLists' onDragOver={(e) => dragOver(e)}>
          {todos
            .filter((todo) => todo.status === "todo")
            .map((todo) => (
              <p
                key={todo._id}
                className='todoList__doList'
                draggable
                onDragStart={(e) => dragStart(e)}>
                {todo.content}
              </p>
            ))}
        </div>
      </div>
      <div className='todoList__doing'>
        <div className='todoList__doingHeader'>
          <h3 className='todoList__doingTitle'>In progress</h3>
          <p className='todoList__doingCount'>0</p>
        </div>
        <div className='todoList__doingLists' onDragOver={(e) => dragOver(e)}>
          <p
            className='todoList__doingList'
            draggable
            onDragStart={(e) => dragStart(e)}>
            uihiuij iuiuiu
          </p>
        </div>
      </div>
      <div className='todoList__done'>
        <div className='todoList__doneHeader'>
          <h3 className='todoList__doneTitle'>Done</h3>
          <p className='todoList__doneCount'>0</p>
        </div>
        <div className='todoList__doneLists' onDragOver={(e) => dragOver(e)}>
          <p
            className='todoList__doneList'
            draggable
            onDragStart={(e) => dragStart(e)}>
            iuy ihiu
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
