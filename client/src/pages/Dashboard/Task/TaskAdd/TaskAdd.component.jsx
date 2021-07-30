import React, { useState } from "react";
import "./TaskAdd.style.scss";

import { Chip } from "@material-ui/core";

const levels = ["critical", "important", "normal"];
const categories = [
  { name: "food", color: "#FCB877" },
  { name: "entertainment", color: "#6ED986" },
  { name: "workout", color: "#F6816D" },
  { name: "personal", color: "#F77295" },
  { name: "work", color: "#43226D" },
  { name: "clean", color: "#CD302F" },
  { name: "others", color: "#0ABFC3" },
];

const TaskAdd = () => {
  const [priority, setPriority] = useState("normal");
  const [category, setCategory] = useState("personal");

  const changeHandler = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };
  console.log(priority);

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
          <div className='form-radio-group'>
            {levels.map((level) => (
              <div key={level} className='radio-group'>
                <input
                  type='radio'
                  name='priority'
                  value={level}
                  checked={priority === level}
                  onChange={changeHandler}
                />
                <label>{level}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='form-group'>
          <label>Category</label>
          <div className='form-category-group'>
            {categories.map((category) => (
              <Chip
                size='medium'
                style={{ background: `${category.color}` }}
                label={category.name}
              />
            ))}
          </div>
        </div>
        <div className='form-group'>
          <input type='date' />
        </div>
      </form>
    </div>
  );
};

export default TaskAdd;
