import React, { useState } from "react";
import "./TaskAdd.style.scss";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../../../../redux/actions/user.actions";

const levels = ["critical", "important", "normal"];
const categories = [
  "food",
  "entertainment",
  "workout",
  "personal",
  "work",
  "clean",
  "shopping",
  "travel",
  "others",
];

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
    color: "white",
  },
}))(ToggleButtonGroup);

const TaskAdd = () => {
  const [title, setTitle] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("critical");
  const [category, setCategory] = useState("personal");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const changePriorityHandler = (e, value) => setPriorityLevel(value);
  const changeDateHandler = (e) => setDueDate(e.target.value);
  const changeCategoryHandler = (e) => setCategory(e.target.value);
  const changeTitleHandler = (e) => {
    if (e.target.value.length > 75) return;
    setTitle(e.target.value);
  };

  const toggleLoading = (val) => setLoading(val);

  const submitHandler = (e) => {
    e.preventDefault();
    const task = { title, priorityLevel, category, dueDate };
    dispatch(addTask(toggleLoading, task, history));
  };

  return (
    <div className='taskAdd'>
      <h3 className='title'>Create Task</h3>
      <form className='form' onSubmit={submitHandler}>
        <div className='form-group'>
          <label>Title</label>
          <input
            type='text'
            value={title}
            placeholder='Task title'
            onChange={changeTitleHandler}
          />
          <p className='title--length'>{75 - +title.length}</p>
        </div>
        <div className='form-group'>
          <label>Priority Level</label>
          <div className='form-priority-group'>
            <StyledToggleButtonGroup
              size='medium'
              value={priorityLevel}
              exclusive
              onChange={changePriorityHandler}
              aria-label='text alignment'
            >
              {levels.map((level) => (
                <ToggleButton
                  key={level}
                  value={level}
                  aria-label={level}
                  disabled={level === priorityLevel}
                >
                  {level}
                </ToggleButton>
              ))}
            </StyledToggleButtonGroup>
          </div>
        </div>

        <div className='form-group'>
          <label>Category</label>
          <div className='form-category-group'>
            {categories.map((cate) => (
              <div>
                <input
                  type='radio'
                  name='category'
                  value={cate}
                  checked={category === cate}
                  onChange={changeCategoryHandler}
                />
                <label>{cate}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='form-group'>
          <label>Due Date</label>
          <input type='date' value={dueDate} onChange={changeDateHandler} />
        </div>
        <div className='button-group'>
          <button type='button' onClick={() => history.goBack()}>
            Cancel
          </button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TaskAdd;
