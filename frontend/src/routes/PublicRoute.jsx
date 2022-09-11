import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { ROUTES } from '../utils/constants';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn && restricted ? (
                    <Redirect to={ROUTES.DEFAULT} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
