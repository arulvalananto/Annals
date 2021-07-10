import React from "react";
import "./Pages.style.scss";
// React-Redux
import { useSelector } from "react-redux";
// React Router
import { Link } from "react-router-dom";

import { day, date, month, year } from "../../utils/dates";

const Pages = () => {
  const diary = useSelector((state) => state.auth.user.diary);

  if (!diary) {
    return <p>Something went wrong!</p>;
  }

  return (
    <>
      {diary.pages.length === 0 ? (
        <p className="pages__empty">Nothing write yet...</p>
      ) : (
        <div className="pages">
          {diary.pages.map(({ _id, writtenAt }) => (
            <Link key={_id} className="page" to={`/diary/view/${_id}`}>
              <p className="page__labelStart">{day(writtenAt)}</p>
              <p className="page__labelMid">{date(writtenAt)} </p>
              <p className="page__labelEnd">{month(writtenAt)}</p>
              <p className="page__labelCorner">{year(writtenAt)}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Pages;
