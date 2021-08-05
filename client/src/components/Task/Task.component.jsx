import React from "react";
import "./Task.style.scss";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
  Tooltip,
} from "@material-ui/core";

import {
  FaBroom,
  FaLaptopCode,
  FaShoppingCart,
  FaSuitcaseRolling,
  FaTrophy,
  FaUserAlt,
} from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { RiNetflixLine, RiDeleteBinLine } from "react-icons/ri";

const pickCategory = (category) => {
  switch (category) {
    case "food":
      return <IoFastFoodOutline size={20} />;
    case "workout":
      return <CgGym size={20} />;
    case "entertainment":
      return <RiNetflixLine size={20} />;
    case "clean":
      return <FaBroom size={20} />;
    case "work":
      return <FaLaptopCode size={20} />;
    case "personal":
      return <FaUserAlt size={20} />;
    case "others":
      return <FaTrophy size={20} />;
    case "shopping":
      return <FaShoppingCart size={20} />;
    case "travel":
      return <FaSuitcaseRolling size={20} />;
    default:
      return;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgb(29, 28, 28)",
    color: "#fff",
  },
  summary: {
    display: "flex",
    alignItems: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "10%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "#f41368",
  },
}));

const Task = ({ data, onDelete, title }) => {
  const classes = useStyles();

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<MdExpandMore color='#fff' />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
        classes={classes.summary}
      >
        <Typography className={classes.heading}>{title}</Typography>
        <Typography className={classes.secondaryHeading}>
          {data.length}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className='task'>
        {data.map((task) => (
          <Tooltip
            arrow
            placement='top'
            title={`${
              task.dueDate
                ? "Due date: " + new Date(task.dueDate).toDateString()
                : ""
            }`}
          >
            <div className='task__tasks' key={task._id}>
              <p className='task__title'>
                <p>
                  <RiDeleteBinLine
                    size={20}
                    onClick={() => onDelete(task._id)}
                  />
                </p>
                <span>{task.title}</span>
              </p>
              <select className='task__status' value={task.status}>
                <option value='todo' selected={task.status === "todo"}>
                  to do
                </option>
                <option selected={task.status === "in-progress"}>
                  In progress
                </option>
                <option selected={task.status === "completed"}>
                  Completed
                </option>
              </select>
              <p
                className={`task__priority task__priority--${task.priorityLevel}`}
              >
                {task.priorityLevel}
              </p>
              <Tooltip title={task.category} arrow placement='top'>
                <p className='task__category'>{pickCategory(task.category)}</p>
              </Tooltip>
            </div>
          </Tooltip>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default Task;
