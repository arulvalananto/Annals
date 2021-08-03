import React, { useState } from "react";
import "./Task.style.scss";

import { FiMenu, FiGrid, FiPlus } from "react-icons/fi";

import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
const Task = () => {
  const [pattern, setPattern] = useState("grid");

  const changePatternHandler = (val) => setPattern(val);

  return (
    <div className='task'>
      <header className='task__header'>
        <div className='task__headerLeft'>
          <Tooltip title='Grid' arrow placement='top'>
            <p
              className={`task__headerLeftOptions ${
                pattern === "grid" ? "task__headerLeftOptions--active" : ""
              }`}
              onClick={() => changePatternHandler("grid")}
            >
              <FiGrid size={20} />
            </p>
          </Tooltip>
          <Tooltip title='List' arrow placement='top'>
            <p
              className={`task__headerLeftOptions ${
                pattern === "list" ? "task__headerLeftOptions--active" : ""
              }`}
              onClick={() => changePatternHandler("list")}
            >
              <FiMenu size={20} />
            </p>
          </Tooltip>
        </div>

        <div className='task__headerRight'>
          <Tooltip title='Add' arrow placement='top'>
            <Link to='/tasks/add' className='task__headerRightOptions'>
              <FiPlus size={20} />
            </Link>
          </Tooltip>
        </div>
      </header>
      <main className='task__main'>
        <div className='task__mainTop'>
          <p className='task__tasks'>Tasks</p>
          <p className='task__importance'>Importance</p>
          <p className='task__category'>Category</p>
          <p className='task__dueDate'>Due Date</p>
        </div>
      </main>
    </div>
  );
};

export default Task;
