import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import {
  Add,
  Assignment,
  Beenhere,
  Clear,
  Done,
  GpsFixed,
  MenuBook,
  History,
  Notifications,
} from "@mui/icons-material";

import { greet } from "../../utils/helpers";
import IconButton from "../../components/IconButton";

import {
  changeFocus,
  fetchDashboardData,
} from "../../store/actions/common.actions";

const links = [
  {
    Icon: Add,
    to: "/journals/add",
    content: "create new journal",
  },
  {
    Icon: Add,
    to: "/personal/create",
    content: "create new personal info",
  },
  {
    Icon: History,
    to: "/focus/log",
    content: "History of focus",
  },
];

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { synced, docs } = useSelector((state) => state.common);

  const dispatch = useDispatch();

  const [isFocusMode, setIsFocusMode] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [focus, setFocus] = useState(docs?.focus);
  const [initialState, setInitialState] = useState(docs?.focus);

  useEffect(() => {
    if (!synced)
      dispatch(
        fetchDashboardData(setInitialLoading, setFocus, setInitialState)
      );
    else setInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFocusMode = (val) => setIsFocusMode(val);

  const clearChangeFocus = () => {
    setFocus(initialState);
    handleFocusMode(false);
  };

  const handleChangeFocus = () => {
    handleFocusMode(false);
    dispatch(changeFocus(focus, setIsLoading, setInitialState));
  };

  if (initialLoading) return null;

  return (
    <div>
      <div className="h-40 xl:bg-mildgray bg-transparent w-full p-4 sm:px-10 sm:py-8">
        <div className="flex items-center justify-between">
          <h1 className="sm:text-xl">
            Good {greet()}, {user.fullName.split(" ")[0]}
          </h1>
          <p className="p-2 rounded-full bg-black flex items-center justify-center cursor-pointer">
            <Notifications fontSize="0.8rem" />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 place-items-center transform -translate-y-16 p-4">
        <div className="p-5 xl:w-56 w-full h-32 bg-primary text-white rounded select-none col-span-1">
          <Beenhere />
          <h1 className="capitalize mt-2 text-sm">No of Days used</h1>
          <p className="text-2xl mt-1">{docs.days}</p>
        </div>
        <div className="p-5 xl:w-56 w-full h-32 bg-secondary text-white rounded select-none col-span-1">
          <MenuBook />
          <h1 className="capitalize mt-2 text-sm">No of journals written</h1>
          <p className="text-2xl mt-1">{docs.journals}</p>
        </div>
        <div className="p-5 xl:w-56 w-full h-32 bg-tertiary text-black rounded select-none col-span-1">
          <Assignment />
          <h1 className="capitalize mt-2 text-sm">Pending Tasks</h1>
          <p className="text-2xl mt-1">{docs.tasks}</p>
        </div>
        <div className="p-5 xl:w-56 w-full h-32 bg-moderate text-black rounded col-span-1">
          <h1 className="capitalize text-lg flex items-center gap-3 select-none">
            Today's Focus{" "}
            {!isFocusMode ? (
              <Tooltip title="Change Focus" placement="top">
                <GpsFixed
                  onClick={() => {
                    !isLoading && handleFocusMode(true);
                  }}
                  className="cursor-pointer"
                />
              </Tooltip>
            ) : (
              <div className="flex items-center gap-2">
                <Tooltip title="clear focus" placement="top">
                  <p onClick={clearChangeFocus}>
                    <IconButton Icon={Clear} fontSize="0.8rem" />
                  </p>
                </Tooltip>
                <Tooltip title="set focus" placement="top">
                  <p onClick={handleChangeFocus}>
                    <IconButton Icon={Done} fontSize="0.8rem" />
                  </p>
                </Tooltip>
              </div>
            )}
          </h1>
          <textarea
            className="text-sm mt-1 overflow-scroll h-16 cursor-pointer bg-transparent w-full select-none p-1 placeholder-black border-none border-2 focus:border-black outline-none"
            value={focus}
            placeholder="-"
            onChange={(e) => setFocus(e.target.value)}
            disabled={!isFocusMode}
          />
        </div>
      </div>

      <div className="px-5 flex flex-col gap-3 mb-4">
        {links.map(({ to, content, Icon }) => (
          <Link
            to={to}
            className="flex items-center p-3 rounded bg-mildgray gap-3"
          >
            <Icon />
            <span>{content}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
