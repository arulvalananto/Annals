import React, { useState } from "react";
import "./Diary.scss";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import Pages from "../../../components/Pages/Pages";

const formattedDate = new Date().toISOString().split("T")[0];

const Diary = () => {
  const diary = useSelector((state) => state.auth.user.diary);

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
        {diary?.pages.length > 20 && (
          <div>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>10</button>
            <button>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diary;
