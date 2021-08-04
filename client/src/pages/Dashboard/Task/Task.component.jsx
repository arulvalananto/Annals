import React, { useState } from "react";
import "./Task.style.scss";

import { FiMenu, FiGrid, FiPlus } from "react-icons/fi";

import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTasks } from "../../../redux/reducers/auth.reducer";
const Task = () => {
  const [pattern, setPattern] = useState("list");

  const tasks = useSelector(selectTasks);

  const changePatternHandler = (val) => setPattern(val);

  return (
    <div className='task'>
      <header className='task__header'>
        <div className='task__headerLeft'>
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
          <p className='task__tasksHeader'>Tasks</p>
          <p className='task__statusHeader'>Status</p>
          <p className='task__importanceHeader'>Importance</p>
          <p className='task__categoryHeader'>Category</p>
          <p className='task__dueDateHeader'>Due Date</p>
        </div>
        <div className='task__mainBottom'>
          {tasks.map((task) => (
            <div className='task__tasks' key={task._id}>
              <p className='task__title'>{task.title}</p>
              <p className='task__status'>{task.status}</p>
              <p className='task__priority'>{task.priorityLevel}</p>
              <p className='task__category'>{task.category}</p>
              <p className='task__dueDate'>
                {task.dueDate ? new Date(task.dueDate).toDateString() : "-"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Task;
