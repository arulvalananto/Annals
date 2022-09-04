import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { getCurrentUser } from './store/actions/auth.actions';
import InitialLoader from './components/InitialLoader';
import Loader from './components/Loader';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Auth/Welcome';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import { ROUTES } from './utils/routes';
const MasterPassword = React.lazy(() => import('./pages/Auth/MasterPassword'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const ForgotPassword = React.lazy(() => import('./pages/Auth/ForgotPassword'));

function App() {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleLoading = (val) => setLoading(val);

    useEffect(() => {
        if (localStorage.getItem('token'))
            dispatch(getCurrentUser(handleLoading));
        else handleLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <InitialLoader />;

    return (
        <BrowserRouter>
            <Toaster />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <PublicRoute
                        restricted={isLoggedIn}
                        path={ROUTES.FORGOT_PASSWORD}
                        component={ForgotPassword}
                    />
                    <PublicRoute
                        restricted={isLoggedIn}
                        path={ROUTES.WELCOME}
                        component={Welcome}
                    />
                    <PublicRoute
                        restricted={isLoggedIn}
                        path={ROUTES.SIGN_IN}
                        component={SignIn}
                    />
                    <PublicRoute
                        restricted={isLoggedIn}
                        path={ROUTES.SIGN_UP}
                        component={SignUp}
                    />
                    <Route
                        path={ROUTES.MASTER_PASSWORD}
                        component={MasterPassword}
                    />
                    <Route path={ROUTES['404']} component={NotFound} exact />
                    <PrivateRoute path={ROUTES.DEFAULT} component={Dashboard} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
