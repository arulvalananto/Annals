import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import routes from "../data/DashboardRoutes";
import { getCurrentUser } from "../store/actions/auth.actions";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { isLoading } = useSelector((state) => state.loader);

  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const handleLoading = (val) => setLoading(val);

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(getCurrentUser(handleLoading));
    else handleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("verified")) history.push("/master-password");
  });

  return (
    <>
      {(isLoading || loading) && <LinearProgress color="secondary" />}
      <div className="grid grid-cols-6 w-screen h-screen font-poppins overflow-x-hidden">
        <Sidebar />
        <div className="col-span-6 xl:col-span-5 bg-bgdark text-white">
          <TopBar />
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map(({ path, component, exact }, index) => (
                <Route
                  path={path}
                  component={component}
                  key={index}
                  exact={exact}
                />
              ))}
              <Redirect from="*" to="/404" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
