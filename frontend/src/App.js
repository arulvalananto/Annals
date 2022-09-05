import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Loader from './components/Loader';
import { ROUTES } from './utils/routes';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Auth/Welcome';
import { TOKEN_NAME } from './api/constants';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import InitialLoader from './components/InitialLoader';
import { getCurrentUser } from './store/actions/auth.actions';
const NotFound = React.lazy(() => import('./pages/NotFound'));
const MasterPassword = React.lazy(() => import('./pages/Auth/MasterPassword'));
const ForgotPassword = React.lazy(() => import('./pages/Auth/ForgotPassword'));

function App() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(true);

    const fetchUser = () => {
        if (localStorage.getItem(TOKEN_NAME))
            dispatch(getCurrentUser(setLoading));
        else setLoading(false);
    };

    useEffect(fetchUser, []);

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
