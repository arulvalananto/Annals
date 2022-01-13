import React from "react";
import { HighlightOff, ContentPaste, Visibility } from "@mui/icons-material";

import IconButton from "../../../components/IconButton";

const Password = ({ password: { name, username, password }, index }) => {
  return (
    <div className="bg-bgdark flex items-center justify-between p-3 rounded mb-5">
      <p className="flex-1 text-center">{index + 1}</p>
      <p className="flex-1 text-center">{name}</p>
      <p className="flex-1 text-center">{username}</p>
      <div className="flex-1 text-center flex items-center justify-center gap-2">
        <input
          type="password"
          className="bg-bgdark outline-none select-none w-1/2"
          value={password}
          disabled
        />
        <button type="button" className="">
          <IconButton Icon={ContentPaste} />
        </button>
      </div>
      <p className="flex-1 text-center">1 month ago</p>
      <p className="flex-1 flex item-center justify-center gap-5">
        <button type="button" onClick={() => console.log("clicked")}>
          <IconButton Icon={Visibility} color="moderate" />
        </button>
        <button type="button" onClick={() => console.log("clicked")}>
          <IconButton Icon={HighlightOff} color="danger" />
        </button>
      </p>
    </div>
  );
};

export default Password;
