import React, { useEffect, useRef, useState } from "react";
import "./TodoList.style.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "../../../redux/reducers/auth.reducer";
import { addTodo, updateTodoStatus } from "../../../redux/actions/user.actions";

import { IoAdd } from "react-icons/io5";
import { GoChevronRight } from "react-icons/go";
import { GrSubtract } from "react-icons/gr";
import { CircularProgress, Tooltip } from "@material-ui/core";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const contentRef = useRef();

  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const todo = todos?.filter((el) => el.status === "todo");
  const inprogress = todos?.filter((el) => el.status === "inprogress");
  const done = todos?.filter((el) => el.status === "done");

  // const sections = [
  //   { title: "To Do", variable: todo },
  //   { title: "In Progress", variable: inprogress },
  //   { title: "Done", variable: done },
  // ];

  useEffect(() => {
    if (editMode) {
      contentRef.current.selectionStart = contentRef.current.value.length;
      contentRef.current.selectionEnd = contentRef.current.value.length;
      contentRef.current.focus();
    }
  }, [editMode, contentRef]);

  const toggleLoading = (val) => setLoading(val);
  const toggleEditMode = () => setEditMode(!editMode);

  const clearInput = () => setContent("");

  const dragOver = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newTodos = todos.map((el) =>
      el._id === draggableId ? { ...el, status: destination.droppableId } : el
    );
    dispatch(updateTodoStatus(newTodos, destination.droppableId, draggableId));
  };

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  console.log(todos);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(addTodo(toggleLoading, content, clearInput, toggleEditMode));
  };

  const renderInput = () => {
    if (editMode) {
      return (
        <form onSubmit={submitHandler} className='todoList__AddContent'>
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
      <DragDropContext onDragEnd={(e) => dragOver(e)}>
        <div className='todoList__do'>
          <div className='todoList__doHeader'>
            <h3 className='todoList__doTitle'>To do</h3>
            <p className='todoList__doCount'>{todo?.length || "0"}</p>
          </div>
          <Tooltip title={editMode ? "close" : "add"} arrow placement='top'>
            <p
              className='todoList__doAddButton'
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? <GrSubtract size={20} /> : <IoAdd size={20} />}
            </p>
          </Tooltip>
          <div>{renderInput()}</div>
          <Droppable droppableId='todo'>
            {(provided, snapshot) => (
              <div
                className={`todoList__doLists ${
                  snapshot.isDraggingOver ? "todoList__doLists--dragging" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
                key='todo'
              >
                {todo.map((todo, index) => (
                  <Draggable
                    draggableId={todo._id}
                    index={index}
                    key={todo._id}
                  >
                    {(provided, snapshot) => (
                      <p
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`todoList__doList ${
                          snapshot.isDragging
                            ? "todoList__doList--dragging"
                            : ""
                        }`}
                        ref={provided.innerRef}
                      >
                        {todo.content}
                      </p>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className='todoList__doing'>
          <div className='todoList__doingHeader'>
            <h3 className='todoList__doingTitle'>In progress</h3>
            <p className='todoList__doingCount'>{inprogress?.length || "0"}</p>
          </div>
          <Droppable droppableId='inprogress'>
            {(provided, snapshot) => (
              <div
                className={`todoList__doingLists ${
                  snapshot.isDraggingOver
                    ? "todoList__doingLists--dragging"
                    : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {inprogress.map((todo, index) => (
                  <Draggable draggableId={todo._id} index={index}>
                    {(provided, snapshot) => (
                      <p
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`todoList__doingList ${
                          snapshot.isDragging
                            ? "todoList__doingList--dragging"
                            : ""
                        }`}
                        ref={provided.innerRef}
                      >
                        {todo.content}
                      </p>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className='todoList__done'>
          <div className='todoList__doneHeader'>
            <h3 className='todoList__doneTitle'>Done</h3>
            <p className='todoList__doneCount'>{done?.length || "0"}</p>
          </div>
          <Droppable droppableId='done'>
            {(provided, snapshot) => (
              <div
                className={`todoList__doneLists ${
                  snapshot.isDraggingOver ? "todoList__doneLists--dragging" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {done.map((todo, index) => (
                  <Draggable draggableId={todo._id} index={index}>
                    {(provided, snapshot) => (
                      <p
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`todoList__doneList ${
                          snapshot.isDragging
                            ? "todoList__doneList--dragging"
                            : ""
                        }`}
                        ref={provided.innerRef}
                      >
                        {todo.content}
                      </p>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoList;
