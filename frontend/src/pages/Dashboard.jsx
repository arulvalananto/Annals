import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';

import { ROUTES } from '../utils/routes';
import TopBar from '../components/TopBar';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import routes from '../data/DashboardRoutes';
import { getCurrentUser } from '../store/actions/auth.actions';
import { TOKEN_NAME, VERIFICATION_TOKEN_NAME } from '../api/constants';

const Dashboard = () => {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.loader);

    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (!sessionStorage.getItem(VERIFICATION_TOKEN_NAME)) {
            push(ROUTES.MASTER_PASSWORD);
        } else {
            if (localStorage.getItem(TOKEN_NAME))
                dispatch(getCurrentUser(setInitialLoading));
            else setInitialLoading(false);
        }
    }, []);

    return (
        <>
            {(isLoading || initialLoading) && (
                <LinearProgress color="secondary" />
            )}
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
