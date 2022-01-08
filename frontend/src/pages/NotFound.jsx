import { KeyboardArrowLeft } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <figure>
        <div class="sad-mac"></div>
        <figcaption>
          <span class="sr-text">Error 404: Not Found</span>
          <span class="e"></span>
          <span class="r"></span>
          <span class="r"></span>
          <span class="o"></span>
          <span class="r"></span>
          <span class="_4"></span>
          <span class="_0"></span>
          <span class="_4"></span>
          <span class="n"></span>
          <span class="o"></span>
          <span class="t"></span>
          <span class="f"></span>
          <span class="o"></span>
          <span class="u"></span>
          <span class="n"></span>
          <span class="d"></span>
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
