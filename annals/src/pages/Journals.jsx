import React, { useEffect, useState } from "react";
import { Add, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { fetchJournals } from "../store/actions/journals.action";
import SkeletonLoader from "./SkeletonLoader";
import MonthPicker from "../components/MonthPicker";
import Alerter from "../components/Alerter";

const Journals = () => {
  const dispatch = useDispatch();

  const journals = useSelector((state) => state.journals);
  const { failure, success } = useSelector((state) => state.notify);

  const [loading, setLoading] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState("");

  const handleSelectedMonth = (value) => setSelectedMonth(value);

  const handleLoading = (val) => setLoading(val);

  useEffect(() => {
    dispatch(fetchJournals(handleLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Alerter message={failure} visible={failure} type="error" />
      <Alerter message={success} visible={success} type="success" />
      <Tooltip title="Add" placement="top">
        <Link to="/journals/add">
          <button className="bg-secondary p-3 rounded-3xl fixed bottom-10 right-10 z-30 block sm:hidden">
            <Add className="transition duration-700 transform hover:scale-110" />
          </button>
        </Link>
      </Tooltip>
      <div className="text-center w-full h-24 flex items-center justify-center">
        <div className="w-full px-10 flex sm:flex-row flex-col items-center justify-between">
          <Tooltip title="Add" placement="top">
            <Link to="/journals/add">
              <button className="bg-secondary p-3 py-2 rounded transition duration-300 transform hover:scale-90 hidden sm:block">
                <Add className="transition duration-700 transform hover:scale-110" />
              </button>
            </Link>
          </Tooltip>
          <MonthPicker
            selectedMonth={selectedMonth}
            handleSelectedMonth={handleSelectedMonth}
          />
          <Tooltip title="Sort By" placement="top">
            <div className="hidden md:block">
              <select className="p-2 px-3 rounded bg-mildgray flex items-center justify-center text-sm">
                <option className="text-sm">Ascending</option>
                <option className="text-sm">Descending</option>
              </select>
            </div>
          </Tooltip>
        </div>
      </div>
      <div>
        {loading ? (
          <SkeletonLoader />
        ) : journals?.length > 0 ? (
          <div className="grid lg:grid-cols-4 xl:place-items-center md:grid-cols-3 sm:grid-cols-2 lg:gap-x-1 gap-x-3 gap-y-5 grid-cols-1 p-3 py-10 pb-40 sm:pb-10">
            {journals?.map(({ id, date, updatedAt }) => (
              <div
                key={id}
                className="lg:w-62 xl:w-72 h-40 bg-mildgray col-span-1 rounded-sm shadow p-5 relative transition duration-500 transform hover:-rotate-3"
              >
                <Link to={`/journals/view/${id}`}>
                  <h1 className="text-2xl select-none">
                    {moment(date).locale("en-in").format("DD-MM-YYYY")}
                  </h1>
                  <p className="text-xs mt-1 text-darkgray mb-4 select-none">
                    Written at {moment(updatedAt).format("LT")}
                  </p>
                  <hr className="text-darkgray" />
                </Link>
                <div className="absolute right-0 bottom-0 w-36 text-right p-5 ">
                  <Tooltip title="Edit">
                    <Link to={`/journals/edit/${id}`}>
                      <IconButton>
                        <Edit className="hover:text-moderate text-white transition duration-500 transform hover:scale-125 cursor-pointer" />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="w-full text-center mt-10 select-none">
            No Journals Found
          </p>
        )}
      </div>
    </>
  );
};

export default Journals;
