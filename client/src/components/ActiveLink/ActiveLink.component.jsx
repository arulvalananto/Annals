import React from "react";

import { Tooltip } from "@material-ui/core";

import { Link, useRouteMatch } from "react-router-dom";

const ActiveLink = ({ title, to, Icon }) => {
    let match = useRouteMatch({
        path: to,
        exact: true
    });

    return (
        <Link to={to}>
            <Tooltip title={title} placement="right" arrow>
                <p className={`sidebar__logo ${match && "sidebar__logo--active"}`}>
                    <Icon size={20} />
                </p>
            </Tooltip>
        </Link>
    );
};

export default ActiveLink;
