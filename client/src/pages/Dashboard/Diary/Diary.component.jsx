import React, { useState } from "react";
import "./Diary.style.scss";

import { Link } from "react-router-dom";
// Icons
import { IoMdOptions } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { FcSearch } from "react-icons/fc";
// MaterialUI
import { Tooltip } from "@material-ui/core";

import Pages from "../../../components/Pages/Pages.component";

const formattedDate = new Date().toISOString().split("T")[0];

const Diary = () => {
  const [dateFormat, setDateFormat] = useState("date");

  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => setShowOptions(!showOptions);

  const restore = () => {
    setDateFormat("date");
  };

  return (
    <>
      {showOptions && <div className='diary__overlay'></div>}
      <div className='diary'>
        <div className='diary__top'>
          <Link to='/diary/add' className='diary__topAddButton'>
            <p>Add</p>
          </Link>
          <div className='diary__topContainer'>
            <input
              className='diary__topInput'
              type='text'
              placeholder='Search here'
            />
            {!showOptions && (
              <Tooltip title='options' arrow placement='top'>
                <IoMdOptions
                  className='diary__topSearchOptions'
                  onClick={toggleShowOptions}
                />
              </Tooltip>
            )}
            <Tooltip title='search' arrow placement='top'>
              <FcSearch className='diary__topSearch' />
            </Tooltip>
          </div>
          {showOptions && (
            <div className='diary__topOptions'>
              <MdClear
                className='diary__topOptionsClose'
                onClick={toggleShowOptions}
              />
              <div className='diary__topDatePickerContainer'>
                <label htmlFor='date'>Date</label>
                <input
                  className='diary__topDatePicker'
                  type={dateFormat}
                  max={formattedDate}
                />
              </div>
              <div className='diary__topDateOptionsContainer'>
                <label>Date Format</label>
                <select
                  onChange={(e) => setDateFormat(e.target.value)}
                  className='diary__topDateOptions'
                >
                  <option value='date'>Day</option>
                  <option value='week'>Week</option>
                  <option value='month'>Month</option>
                </select>
              </div>
              <div className='diary__topSearchButtonContainer'>
                <button
                  className='diary__topRestoreButton'
                  type='button'
                  onClick={restore}
                >
                  Restore
                </button>
                <button className='diary__topSearchButton' type='submit'>
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='diary__bottom'>
          <Pages />
        </div>
      </div>
    </>
  );
};

export default Diary;
