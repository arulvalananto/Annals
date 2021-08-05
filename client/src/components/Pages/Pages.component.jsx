import React from "react";
import "./Pages.style.scss";
// React-Redux
import { useSelector } from "react-redux";
import { selectDiary } from "../../redux/reducers/auth.reducer";
// React Router
import { Link } from "react-router-dom";
// Utilities
import { day, date, month, year } from "../../utils/dates";

const Pages = () => {
  const diary = useSelector(selectDiary);

  if (!diary) {
    return <p>Something went wrong!</p>;
  }

  return (
    <>
      {diary?.length === 0 ? (
        <p className='pages__empty'>Nothing write yet...</p>
      ) : (
        <div className='pages'>
          {diary?.map(({ _id, createdAt }) => (
            <Link key={_id} className='page' to={`/journals/page-view/${_id}`}>
              <p className='page__labelStart'>{day(createdAt)}</p>
              <p className='page__labelMid'></p>
              <p className='page__labelEnd'>
                {date(createdAt)}
                <span>{month(createdAt)}</span>
              </p>
              <p className='page__labelCorner'>{year(createdAt)}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Pages;
