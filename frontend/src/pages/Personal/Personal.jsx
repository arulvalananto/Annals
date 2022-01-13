import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Search, Add } from "@mui/icons-material";

import { fetchPersonalData } from "../../store/actions/personal.actions";
import SkeletonLoader from "../../components/SkeletonLoader";

const Personal = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal);

  const links = [
    {
      to: "/personal/passwords",
      title: "Passwords",
      count: personal?.passwords.length || 0,
      color: "primary",
    },
    {
      to: "/personal/crypto-wallet",
      title: "Crypto Wallets",
      count: personal?.cryptoWallets.length || 0,
      color: "secondary",
    },
    {
      to: "/personal/cards",
      title: "Cards",
      count: personal?.cards.length || 0,
      color: "tertiary",
    },
  ];

  const handleLoading = (val) => setInitialLoading(val);

  useEffect(() => {
    if (
      !personal.passwords.length ||
      !personal.cryptoWallets.length ||
      !personal.cards.length
    ) {
      dispatch(fetchPersonalData(handleLoading));
    } else {
      handleLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="bg-bglight px-4 py-2 flex items-center w-full sm:w-96 rounded">
          <Search />
          <input
            type="search"
            placeholder="Search"
            className="bg-bglight outline-none border-none w-full ml-3"
          />
        </div>
        <button
          type="button"
          onClick={() => history.push("/personal/create")}
          className="hidden sm:flex sm:items-center bg-primary px-4 py-2 pr-14 rounded-3xl relative cursor-pointer transition-all transform hover:translate-y-1 group"
        >
          <span className="transition-all transform group-hover:scale-85">
            New
          </span>
          <p className="bg-white text-black absolute top-0 right-0 px-2 py-2 rounded-3xl transition-all transform group-hover:rotate-90">
            <Add />
          </p>
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between flex-grow flex-shrink gap-5 mt-10">
        {initialLoading ? (
          <SkeletonLoader />
        ) : (
          links.map(({ count, to, title, color }, index) => (
            <Link
              key={index}
              to={to}
              className="bg-mildgray w-full sm:w-96 flex-1 h-40 rounded flex flex-col items-center justify-center p-5"
            >
              <h1 className={`text-3xl text-${color} capitalize`}>{title}</h1>
              <p className="text-xl font-jura font-bold mt-3">{count}</p>
            </Link>
          ))
        )}
      </div>
      <button className="sm:hidden bg-secondary fixed bottom-10 right-10 p-3 rounded-3xl transition-all transform hover:scale-95 hover:rotate-45">
        <Add />
      </button>
    </div>
  );
};

export default Personal;
