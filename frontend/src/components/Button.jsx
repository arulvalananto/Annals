import { CircularProgress } from "@mui/material";
import React from "react";

const Button = ({ title, className, type, loading = false }) => {
  const style = loading
    ? "w-full bg-darkgray text-white cursor-not-allowed p-3"
    : className
    ? className
    : "";

  return (
    <button
      className={`shadow p-2 px-8 rounded rounded-tl-xl rounded-br-xl flex items-center justify-center ${style}`}
      type={type}
      disabled={loading}
    >
      {loading ? <CircularProgress size="20px" color="inherit" /> : title}
    </button>
  );
};

export default React.memo(Button);
