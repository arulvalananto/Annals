import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { Route, Switch } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import routes from "../data/DashboardRoutes";
import { getCurrentUser } from "../store/actions/auth.actions";

const Dashboard = () => {
  const { isLoading } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const handleLoading = (val) => setLoading(val);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser(handleLoading));
    } else handleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {(isLoading || loading) && <LinearProgress color="secondary" />}
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
