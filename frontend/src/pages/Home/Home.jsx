import React, { useState, useEffect } from "react";
import { Tooltip as MUITooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Assignment,
  Beenhere,
  GpsFixed,
  MenuBook,
  Notifications,
} from "@mui/icons-material";

import { Line } from "react-chartjs-2";
import { greet } from "../../utils/helpers";
import Loader from "../../components/Loader";
import { fetchDashboardData } from "../../store/actions/dashboard.actions";
import { LINKS } from "../../utils/constants";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Habit Tracker Data",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const habitTrackerData = {
  labels,
  datasets: [
    {
      label: "Habit Tracker",
      data: labels.map(() => Math.floor(Math.random() * 30)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { synced, docs } = useSelector((state) => state.dashboard);

  const [focus, setFocus] = useState(docs?.focus);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialState, setInitialState] = useState(docs?.focus);

  useEffect(() => {
    if (!synced)
      dispatch(
        fetchDashboardData(setInitialLoading, setFocus, setInitialState)
      );
    else setInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeFocusText = (e) => {
    if (e.target.value?.trim()?.length > 50) {
      return;
    }
    setFocus(e.target.value);
  };

  if (initialLoading) return <Loader />;

  const data = {
    labels: ["Journals", "Ideas", "Tasks"],
    datasets: [
      {
        label: "Usage Analysis",
        data: [2, 9, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="h-40 xl:bg-mildgray bg-transparent w-full p-4 sm:px-10 sm:py-8">
        <div className="flex items-center justify-between">
          <h1 className="sm:text-xl">
            Good {greet()}, {user.fullName.split(" ")[0]}
          </h1>
          <p className="p-2 rounded-full bg-black flex items-center justify-center cursor-pointer relative">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse duration-75 absolute -top-0 -right-0"></span>
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
          <p className="text-2xl mt-1">{`${
            docs.journals.length < 10 ? docs.journals : `0${docs.journals}`
          }`}</p>
        </div>
        <div className="p-5 xl:w-56 w-full h-32 bg-tertiary text-black rounded select-none col-span-1">
          <Assignment />
          <h1 className="capitalize mt-2 text-sm">Pending Tasks</h1>
          <p className="text-2xl mt-1">{docs.tasks || "09"}</p>
        </div>
        <div className="p-5 xl:w-56 w-full h-32 bg-tertiary text-black rounded select-none col-span-1">
          <Assignment />
          <h1 className="capitalize mt-2 text-sm">Written Ideas</h1>
          <p className="text-2xl mt-1">
            {docs.ideas
              ? `${
                  docs.journals.length < 10
                    ? docs.journals
                    : `0${docs.journals}`
                }`
              : "10"}
          </p>
        </div>
      </div>
      <div className="px-5 py-2 pb-10 flex flex-col md:flex-row items-center gap-3 md:gap-10">
        <div className="bg-gray-100 flex-1 rounded-md w-full h-[100px] md:h-[300px] flex items-center justify-center">
          <Line options={options} data={habitTrackerData} />
        </div>
        <div className="p-5 flex-1 w-full h-[300px] bg-moderate text-black rounded">
          <h1 className="capitalize text-lg flex items-center gap-3 select-none">
            Today's Focus{" "}
            <MUITooltip title="Change Focus" placement="top">
              <GpsFixed className="cursor-pointer" />
            </MUITooltip>
          </h1>
          <textarea
            className="text-sm mt-1 overflow-scroll h-16 cursor-pointer bg-transparent w-full select-none p-1 placeholder-black border-none border-2 focus:border-black outline-none"
            value={focus}
            placeholder="-"
            onChange={handleOnChangeFocusText}
            disabled={!isFocusMode}
            onDoubleClick={() => setIsFocusMode(true)}
          />
        </div>
        <div className="bg-gray-100 flex-1 rounded-md w-full h-[300px] flex items-center justify-center">
          <Radar data={data} />
        </div>
      </div>
      <div className="px-5 flex flex-col gap-3 mb-4">
        {LINKS.HOME.map(({ to, content, Icon }, index) => (
          <Link
            key={index}
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
