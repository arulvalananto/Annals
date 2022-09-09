import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import './index.css';

const ActiveLink = ({ title, to, Icon }) => {
    let match = useRouteMatch({
        path: to,
        exact: true,
    });

    return (
        <Link to={to} className={`link ${match && 'active-link'}`}>
            <p className="flex-center-none">
                <Icon size={16} className="mr-3" />
                <span>{title}</span>
            </p>
        </Link>
    );
};

export default React.memo(ActiveLink);
