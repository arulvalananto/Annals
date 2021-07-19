import React, { useState } from "react";
import "./Diary.style.scss";

import { Link } from "react-router-dom";

import Pages from "../../../components/Pages/Pages.component";

const formattedDate = new Date().toISOString().split("T")[0];

const Diary = () => {
  const [dateFormat, setDateFormat] = useState("date");

  return (
    <div className="diary">
      <div className="diary__top">
        <Link to="/diary/add" className="diary__topAddButton">
          <p>Add</p>
        </Link>
        <div className="diary__topContainer">
          <input
            className="diary__topSearch"
            type="text"
            placeholder="Search here"
          />
          <input
            className="diary__topDatePicker"
            type={dateFormat}
            max={formattedDate}
          />
          <select
            onChange={(e) => setDateFormat(e.target.value)}
            className="diary__topDateOptions"
          >
            <option value="date">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          <button className="diary__topSearchButton" type="submit">
            Search
          </button>
        </div>
      </div>
      <div className="diary__bottom">
        <Pages />
      </div>
    </div>
  );
};

export default Diary;
