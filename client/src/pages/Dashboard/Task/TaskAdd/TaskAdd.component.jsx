import React, { useState } from "react";
import "./TaskAdd.style.scss";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

const levels = ["critical", "important", "normal"];
const categories = [
  "food",
  "entertainment",
  "workout",
  "personal",
  "work",
  "clean",
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
  const [priority, setPriority] = useState("normal");
  const [category, setCategory] = useState("personal");
  const [dueDate, setDueDate] = useState(new Date());

  const changePriorityHandler = (e, value) => setPriority(value);
  const changeDateHandler = (e) => setDueDate(e.target.value);
  const changeCategoryHandler = (e) => setCategory(e.target.value);

  console.log(dueDate);

  return (
    <div className='taskAdd'>
      <h3 className='title'>Create Task</h3>
      <form className='form'>
        <div className='form-group'>
          <label>Title</label>
          <input type='text' placeholder='Task title' />
          <p className='title--length'>30</p>
        </div>
        <div className='form-group'>
          <label>Priority Level</label>
          <div className='form-priority-group'>
            <StyledToggleButtonGroup
              size='medium'
              value={priority}
              exclusive
              onChange={changePriorityHandler}
              aria-label='text alignment'
            >
              {levels.map((level) => (
                <ToggleButton
                  key={level}
                  value={level}
                  aria-label={level}
                  disabled={level === priority}
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
          <button type='button'>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TaskAdd;
