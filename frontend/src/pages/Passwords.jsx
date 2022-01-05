import React from "react";
import {
  Edit,
  HighlightOff,
  ContentPaste,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import BackButton from "../components/BackButton";
import { useState } from "react";

const headers = ["No", "Name", "Password", "URL", "Last modified", "Actions"];

const Passwords = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="p-1 sm:p-5">
      <BackButton />
      <h2 className="font-bold text-3xl my-5 capitalize">passwords</h2>
      <div className="bg-mildgray flex items-center justify-between p-3 rounded-sm mb-5">
        {headers.map((header) => (
          <p className="flex-1 text-center">{header}</p>
        ))}
      </div>
      <div>
        <div className="bg-bgdark flex items-center justify-between p-3 rounded mb-5">
          <p className="flex-1 text-center">1</p>
          <p className="flex-1 text-center">Twitter</p>
          <div className="flex-1 text-center flex items-center justify-center relative group">
            <div className="bg-white opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full"></div>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="bg-bgdark outline-none select-nones w"
              value="sjdklfjljlkaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
              disabled
            />
            <button
              type="button"
              className="absolute top-0 right-10 opacity-0 transform transition-opacity hover:scale-105 group-hover:opacity-100"
            >
              <ContentPaste fontSize="0.8rem" />
            </button>

            {isPasswordVisible ? (
              <button
                type="button"
                className="absolute top-0 right-0 opacity-0 transform transition-opacity hover:scale-105 group-hover:opacity-100"
                onClick={togglePasswordVisible}
              >
                <VisibilityOff fontSize="0.8rem" />
              </button>
            ) : (
              <button
                type="button"
                className="absolute top-0 right-0 opacity-0 transform transition-opacity hover:scale-105 group-hover:opacity-100"
                onClick={togglePasswordVisible}
              >
                <Visibility fontSize="0.8rem" />
              </button>
            )}
          </div>
          <a
            href="http://twitter.com"
            className="flex-1 text-center underline"
            target="_blank"
            rel="noreferrer"
          >
            twitter.com
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
      </div>
    </div>
  );
};

export default Passwords;
