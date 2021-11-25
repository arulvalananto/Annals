import React from "react";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { Route, Switch } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import routes from "../data/DashboardRoutes";

const Dashboard = () => {
  const { isLoading } = useSelector((state) => state.loader);

  return (
    <>
      {isLoading && <LinearProgress color="secondary" />}
      <div className="grid grid-cols-6 w-screen h-screen font-poppins overflow-x-hidden">
        <Sidebar />
        <div className="col-span-6 xl:col-span-5 bg-bgdark text-white">
          <TopBar />
          <Switch>
            {routes.map(({ path, component }) => (
              <Route path={path} component={component} key={path} />
            ))}
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
