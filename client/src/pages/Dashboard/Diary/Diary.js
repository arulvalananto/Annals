import React, { useState } from "react";
import "./Diary.scss";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { weeks, months } from "../../../utils/dates";

const formattedDate = new Date().toISOString().split("T")[0];

const Diary = () => {
  const user = useSelector((state) => state.auth.userData.user);

  const [dateFormat, setDateFormat] = useState("date");

  return (
    <div className="diary">
      <div className="diary__top">
        <Link to="/diary/add" className="diary__addButton">
          <p>Add</p>
        </Link>
        <div>
          <input
            className="diary__topInput"
            type="text"
            placeholder="Search here"
          />
          <input
            className="diary__topDate"
            type={dateFormat}
            max={formattedDate}
          />
          <select
            onChange={(e) => setDateFormat(e.target.value)}
            className="diary__topDateSelect"
          >
            <option className="dairy__topDataSelectOption" value="date">
              Day
            </option>
            <option className="dairy__topDataSelectOption" value="week">
              Week
            </option>
            <option className="dairy__topDataSelectOption" value="month">
              Month
            </option>
          </select>
          <button className="diary__topButton" type="submit">
            Search
          </button>
        </div>
      </div>
      <div className="diary__bottom">
        {user.diary?.pages.length === 0 ? (
          <p className="diary__bottomNothing">Nothing write yet...</p>
        ) : (
          <div className="diary__bottomLists">
            {user.diary?.pages.map((page) => (
              <Link
                key={page._id}
                className="diary__bottomList"
                to={`/diary/view/${page._id}`}
              >
                <p className="diary__datePrefix">
                  {weeks[new Date(page.writtenAt).getDay() - 1]}
                </p>
                <p className="diary__dateSuffix">
                  {new Date(page.writtenAt).getDate()}{" "}
                </p>
                <p className="diary__dateEnd">
                  {months[new Date(page.writtenAt).getMonth()]}
                </p>
                <p className="diary__dateYear">
                  {new Date(page.writtenAt).getFullYear()}
                </p>
              </Link>
            ))}
          </div>
        )}
        {user.diary?.pages.length > 20 && (
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
