import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import Table from "../components/Table";
import { Link } from "react-router-dom";

const Passwords = () => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="bg-bglight px-4 py-2 flex items-center w-full sm:w-96 rounded">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search"
            className="bg-bglight outline-none border-none w-full ml-3"
          />
        </div>
        <button className="hidden sm:flex sm:items-center bg-primary px-4 py-2 pr-14 rounded-3xl relative cursor-pointer transition-all transform hover:translate-y-1 group">
          <span className="transition-all transform group-hover:scale-85">
            New
          </span>
          <p className="bg-white text-black absolute top-0 right-0 px-2 py-2 rounded-3xl transition-all transform group-hover:rotate-90">
            <AddIcon />
          </p>
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between flex-grow flex-shrink gap-5 mt-10">
        <Link
          to="/passwords"
          className="bg-mildgray w-full sm:w-96 flex-1 h-40 rounded flex flex-col items-center justify-center p-5"
        >
          <h1 className="text-3xl text-primary">Passwords</h1>
          <p className="text-xl font-jura font-bold mt-3">0</p>
        </Link>
        <Link
          to="/cryptocurrencies"
          className="bg-mildgray w-full sm:w-96 flex-1 h-40 rounded flex flex-col items-center justify-center p-5"
        >
          <h1 className="text-3xl text-secondary">Crypto Wallets</h1>
          <p className="text-xl font-jura font-bold mt-3">0</p>
        </Link>
        <Link
          to="/cards"
          className="bg-mildgray w-full sm:w-96 flex-1 h-40 rounded flex flex-col items-center justify-center p-5"
        >
          <h1 className="text-3xl text-tertiary">Cards</h1>
          <p className="text-xl font-jura font-bold mt-3">0</p>
        </Link>
        {/* <Table /> */}
      </div>
      <button className="sm:hidden bg-secondary fixed bottom-10 right-10 p-3 rounded-3xl transition-all transform hover:scale-95 hover:rotate-45">
        <AddIcon />
      </button>
    </div>
  );
};

export default Passwords;
