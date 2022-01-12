import React, { useState } from "react";
import {
  Edit,
  HighlightOff,
  ContentPaste,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Password = ({ password: { name, username, password, url }, index }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="bg-bgdark flex items-center justify-between p-3 rounded mb-5">
      <p className="flex-1 text-center">{index + 1}</p>
      <p className="flex-1 text-center">{name}</p>
      <p className="flex-1 text-center">{username}</p>
      <div className="flex-1 text-center flex items-center justify-center relative group">
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="bg-bgdark outline-none select-nones w"
          value={password}
          disabled
        />
        <button
          type="button"
          className="absolute -top-6 z-20 right-10 opacity-0 transform transition-opacity hover:scale-110 group-hover:opacity-100"
        >
          <ContentPaste fontSize="0.8rem" />
        </button>

        {!isPasswordVisible ? (
          <button
            type="button"
            className="absolute -top-6 z-20 right-0 opacity-0 transform transition-opacity hover:scale-110 group-hover:opacity-100"
            onClick={togglePasswordVisible}
          >
            <VisibilityOff fontSize="0.8rem" />
          </button>
        ) : (
          <button
            type="button"
            className="absolute -top-6 z-20 right-0 opacity-0 transform transition-opacity hover:scale-110 group-hover:opacity-100"
            onClick={togglePasswordVisible}
          >
            <Visibility fontSize="0.8rem" />
          </button>
        )}
      </div>
      <a
        href={`http://${url}`}
        className="flex-1 text-center underline"
        target="_blank"
        rel="noreferrer"
      >
        {url}
      </a>
      <p className="flex-1 text-center">1 month ago</p>
      <p className="flex-1 flex item-center justify-center gap-5">
        <button
          type="button"
          className="hover:text-moderate transform hover:scale-90"
          onClick={() => console.log("clicked")}
        >
          <Edit />
        </button>
        <button
          type="button"
          className="hover:text-danger transform hover:scale-90"
          onClick={() => console.log("clicked")}
        >
          <HighlightOff />
        </button>
      </p>
    </div>
  );
};

export default Password;