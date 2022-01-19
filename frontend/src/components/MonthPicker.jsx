import React from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  textField: {
    background: "#1d1c1c",
    borderRadius: "0.3rem",
  },
  input: {
    color: "white",
  },
});

const MonthPicker = ({ selectedMonth, handleSelectedMonth }) => {
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        label="Select Month"
        views={["month", "year"]}
        value={selectedMonth}
        minDate={new Date("2017-01-01")}
        onChange={(newValue) => {
          handleSelectedMonth(newValue);
        }}
        color="secondary"
        renderInput={(params) => (
          <TextField
            {...params}
            color="secondary"
            focused
            className={classes.textField}
          />
        )}
        InputProps={{
          className: classes.input,
        }}
      />
    </LocalizationProvider>
  );
};

export default React.memo(MonthPicker);
