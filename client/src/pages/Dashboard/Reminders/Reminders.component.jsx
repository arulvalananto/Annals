import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./Reminders.style.scss";
import Calendar from "react-calendar";
import { Button } from "@material-ui/core";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";

const Reminders = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleShowDatePicker = () => setShowDatePicker(!showDatePicker);

  const changeHandler = (date) => {
    setSelectedDate(date);
    toggleShowDatePicker();
  };

  const renderTitle =
    selectedDate == Date()
      ? "Today Events"
      : `${new Date(selectedDate).toLocaleDateString("en-IN")} Events`;

  return (
    <>
      <div className="reminder">
        <div className="reminder__top">
          <Button
            variant="outlined"
            className="reminder__datePicker"
            onClick={toggleShowDatePicker}
          >
            Select Date
          </Button>
          {showDatePicker && (
            <Calendar
              onChange={(e) => changeHandler(e)}
              value={selectedDate}
              className="reminder__calendar"
              minDate={new Date()}
              nextLabel={<MdSkipNext />}
              next2Label={<GrChapterNext />}
              prevLabel={<MdSkipPrevious />}
              prev2Label={<GrChapterPrevious />}
            />
          )}
        </div>
        <div className="reminder__bottom">
          <div className="reminder__eventsHeader">
            <p>{renderTitle}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reminders;
