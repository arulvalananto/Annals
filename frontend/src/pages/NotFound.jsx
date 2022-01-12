import React from "react";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";

import words from "../data/NotFoundWords";

const NotFound = () => {
  return (
    <>
      <figure>
        <div class="sad-mac"></div>
        <figcaption>
          <span class="sr-text">Error 404: Not Found</span>
          {words.map((word) => (
            <span class={word}></span>
          ))}
        </figcaption>
      </figure>
      <Link to="/" className="flex items-center gap-1 text-white p-2">
        <KeyboardArrowLeft color="inherit" />
        <p className="underline underline-offset-4">Return to Main</p>
      </Link>
    </>
  );
};

export default NotFound;
