import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const ActiveLink = ({ title, to, Icon }) => {
  let match = useRouteMatch({
    path: to,
    exact: true,
  });

  const style = match && "bg-primary rounded-md";

  return (
    <Link
      to={to}
      className={`p-5 select-none py-2 mb-3 text-sm rounded-md transition duration-500 ease-in-out hover:bg-primary transform hover:-translate-y-1 hover:scale-110 ${style}`}
    >
      <p className="flex items-center">
        <Icon size={16} className="mr-3" />
        <span>{title}</span>
      </p>
    </Link>
  );
};

export default ActiveLink;
