import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

import { ROUTES } from '../utils/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={ROUTES.WELCOME} />
                )
            }
        />
    );
};

export default PrivateRoute;
