import React from "react";
import { useSelector } from "react-redux";
import { Assignment, Beenhere, GpsFixed, MenuBook } from "@mui/icons-material";

import { greet } from "../../utils/helpers";
import { useState } from "react";
import { Tooltip } from "@mui/material";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focus, setFocus] = useState(
    "Built and implement meeting required for people"
  );

  const handleChangeFocus = (e) => setFocus(e.target.value);

  return (
    <div>
      <div className="h-40 bg-mildgray w-full px-10 py-8">
        <div>
          <h1 className="text-xl">
            Good {greet()}, {user.fullName}
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-between py-3 px-6 transform -translate-y-16">
        <div className="p-5 w-56 h-32 bg-primary text-white rounded select-none">
          <Beenhere />
          <h1 className="capitalize mt-2 text-sm">No of Days used</h1>
          <p className="text-2xl mt-1">8</p>
        </div>
        <div className="p-5 w-56 h-32 bg-secondary text-white rounded select-none">
          <MenuBook />
          <h1 className="capitalize mt-2 text-sm">No of journals written</h1>
          <p className="text-2xl mt-1">24</p>
        </div>
        <div className="p-5 w-56 h-32 bg-tertiary text-black rounded select-none">
          <Assignment />
          <h1 className="capitalize mt-2 text-sm">Pending Tasks</h1>
          <p className="text-2xl mt-1">89</p>
        </div>
        <div className="p-5 w-56 h-32 bg-moderate text-black rounded">
          <h1 className="capitalize text-lg flex items-center gap-3">
            Today's Focus{" "}
            <Tooltip title="Change Focus" placement="top">
              <GpsFixed
                onClick={() => setIsFocusMode(!isFocusMode)}
                className="cursor-pointer"
              />
            </Tooltip>
          </h1>
          <textarea
            className="text-sm mt-1 overflow-scroll h-16 cursor-pointer bg-transparent w-full select-none"
            value={focus}
            onChange={handleChangeFocus}
            disabled={!isFocusMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
