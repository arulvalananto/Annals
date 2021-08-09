import React, { useState } from "react";
import "./Tasks.style.scss";
import Task from "../../../components/Task/Task.component";

import { FiPlus } from "react-icons/fi";

import { Tooltip, CircularProgress } from "@material-ui/core";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../../../redux/reducers/auth.reducer";
import { deleteTask } from "../../../redux/actions/user.actions";

const filterTasks = (tasks, condition) => {
  return tasks.filter((task) => task.status === condition);
};

const Tasks = () => {
  const tasks = useSelector(selectTasks);
  const [loading, setLoading] = useState(false);

  const todos = filterTasks(tasks, "todo");
  const inProgress = filterTasks(tasks, "in-progress");
  const completed = filterTasks(tasks, "completed");

  const dispatch = useDispatch();

  const toggleLoading = (val) => setLoading(val);

  const deleteHandler = (id) => {
    dispatch(deleteTask(toggleLoading, id));
  };

  return (
    <div className='task'>
      <header className='task__header'>
        <div className='task__headerLeft'>
          <Tooltip title='Add' arrow placement='top'>
            <Link to='/tasks/add' className='task__headerLeftOptions'>
              <FiPlus size={20} />
            </Link>
          </Tooltip>
        </div>
        <div className='task__headerRight'>
          {loading ? (
            <CircularProgress
              color='inherit'
              size={16}
              className='task__headerRightOptions'
            />
          ) : null}
        </div>
      </header>
      <main>
        <Task title='To do' data={todos} onDelete={deleteHandler} />
        <Task title='In progress' data={inProgress} onDelete={deleteHandler} />
        <Task title='Completed' data={completed} onDelete={deleteHandler} />
      </main>
    </div>
  );
};

export default Tasks;
