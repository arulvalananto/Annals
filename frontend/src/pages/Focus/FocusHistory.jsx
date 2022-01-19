import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BackButton from "../../components/BackButton";
import { fetchFocusHistory } from "../../store/actions/common.actions";
import Focus from "./Focus";
import Loader from "../../components/Loader";

const FocusHistory = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  const dispatch = useDispatch();
  const {
    focuses: { docs, synced },
  } = useSelector((state) => state.common);

  useEffect(() => {
    if (!synced) dispatch(fetchFocusHistory(setInitialLoading));
    else setInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initialLoading) return <Loader />;

  return (
    <div className="p-2 md:p-5">
      <BackButton />
      <h2 className="font-bold text-3xl my-5 capitalize">History of Focuses</h2>
      <div className="">
        {docs.map((doc) => (
          <Focus doc={doc} />
        ))}
      </div>
    </div>
  );
};

export default FocusHistory;