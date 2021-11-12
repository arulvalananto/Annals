import React from "react";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { Route } from "react-router-dom";

import Home from "./Home";
import Journals from "./Journals";
import Passwords from "./Passwords";
import Ideas from "./Ideas";
import Tasks from "./Tasks";
import logo from "../assets/logo-2.png";
import Sidebar from "../components/Sidebar";
import DashboardDrawer from "../components/DashboardDrawer";
import JournalsAdd from "./JournalsAdd";
import JournalEdit from "./JournalEdit";
import JournalView from "./JournalView";

const Dashboard = () => {
  const { isLoading } = useSelector((state) => state.loader);

  return (
    <>
      {isLoading && <LinearProgress color="secondary" />}
      <div className="grid grid-cols-6 w-screen h-screen font-poppins overflow-x-hidden">
        <Sidebar />
        <div className="col-span-6 xl:col-span-5 bg-bgdark text-white">
          <div className="flex items-center justify-between lg:justify-around px-4">
            <img
              src={logo}
              alt="Annals Logo"
              className="w-24 h-20 object-contain select-none"
            />
            <div className="shadow rounded block xl:hidden p-2 border-gray">
              <DashboardDrawer />
            </div>
          </div>
          <Route path="/" exact component={Home} />
          <Route path="/journals" exact component={Journals} />
          <Route path="/journals/add" component={JournalsAdd} />
          <Route path="/journals/edit/:id" component={JournalEdit} />
          <Route path="/journals/view/:id" component={JournalView} />
          <Route path="/passwords" exact component={Passwords} />
          <Route path="/ideas" exact component={Ideas} />
          <Route path="/tasks" exact component={Tasks} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
