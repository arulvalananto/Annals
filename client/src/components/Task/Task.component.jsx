import React from "react";
import "./Task.style.scss";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
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
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../../redux/actions/user.actions";

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
    flexBasis: "100px",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "#f41368",
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 120,
    minWidth: 50,
    maxHeight: "50px",
  },
  formLabel: {
    color: "#4b24bf",
  },
  status: {
    color: "#fff",
    fontSize: "14px",
  },
  statusOption: {
    color: "#000",
  },
}));

const Task = ({ data, onDelete, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeStatusHandler = (e) => (id) => {
    console.log(id);
    dispatch(updateTaskStatus(id, e.target.value));
  };
  console.log(data);
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

              <FormControl className={classes.formControl}>
                <InputLabel
                  className={classes.formLabel}
                  htmlFor='status-native-simple'
                >
                  Status
                </InputLabel>
                <Select
                  className={classes.status}
                  native
                  value={task.status}
                  onChange={(e) => changeStatusHandler(e)(task._id)}
                  inputProps={{
                    name: "status",
                    id: "status-native-simple",
                  }}
                >
                  <option className={classes.statusOption} value='todo'>
                    Todo
                  </option>
                  <option className={classes.statusOption} value='in-progress'>
                    In Progress
                  </option>
                  <option className={classes.statusOption} value='completed'>
                    Completed
                  </option>
                </Select>
              </FormControl>
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
