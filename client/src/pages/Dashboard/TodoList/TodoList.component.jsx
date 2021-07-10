import React from "react";
import "./TodoList.style.scss";

import { IoAdd } from "react-icons/io5";

const TodoList = () => {
  const dragOver = (e) => {};

  const dragStart = (e) => {};

  return (
    <div className="todoList">
      <div className="todoList__do">
        <div className="todoList__doHeader">
          <h3 className="todoList__doTitle">To do</h3>
          <p className="todoList__doCount">0</p>
        </div>
        <p className="todoList__doAddButton">
          <IoAdd size={20} />
        </p>
        <div className="todoList__doLists" onDragOver={(e) => dragOver(e)}>
          <p
            className="todoList__doList"
            draggable
            onDragStart={(e) => dragStart(e)}
          >
            kjhkjhkj hklh lkhlk lkhlkhl hlkh lkhlkhlk lklklk hlkh lkhlkhlk
            lkhlkhlk hlkhlkhlkhkjhkjhkjhkj kjhkjsgdhkj
          </p>
        </div>
      </div>
      <div className="todoList__doing">
        <div className="todoList__doingHeader">
          <h3 className="todoList__doingTitle">In progress</h3>
          <p className="todoList__doingCount">0</p>
        </div>
        <div className="todoList__doingLists" onDragOver={(e) => dragOver(e)}>
          <p
            className="todoList__doingList"
            draggable
            onDragStart={(e) => dragStart(e)}
          >
            uihiuij iuiuiu
          </p>
        </div>
      </div>
      <div className="todoList__done">
        <div className="todoList__doneHeader">
          <h3 className="todoList__doneTitle">Done</h3>
          <p className="todoList__doneCount">0</p>
        </div>
        <div className="todoList__doneLists" onDragOver={(e) => dragOver(e)}>
          <p
            className="todoList__doneList"
            draggable
            onDragStart={(e) => dragStart(e)}
          >
            iuy ihiu
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
