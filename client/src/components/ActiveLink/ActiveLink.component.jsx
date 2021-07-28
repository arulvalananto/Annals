import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const ActiveLink = ({ title, to, Icon }) => {
  let match = useRouteMatch({
    path: to,
    exact: true,
  });

  return (
    <Link to={to} className='sidebar__link'>
      <p
        className={`sidebar__logoContainer ${
          match && "sidebar__logoContainer--active"
        }`}
      >
        <Icon size={16} className='sidebar__logo' />
        <span>{title}</span>
      </p>
    </Link>
  );
};

export default ActiveLink;
