import React from "react";
import { useSelector } from "react-redux";

import BackButton from "../components/BackButton";
import CryptoWallet from "./CryptoWallet";

const CryptoWallets = () => {
  const { cryptoWallets } = useSelector((state) => state.personal);

  return (
    <div className="p-1 sm:p-5">
      <BackButton />
      <h2 className="font-bold text-3xl my-5 capitalize">CryptoWallets</h2>
      <div className="flex flex-wrap items-center gap-3">
        {cryptoWallets.map((cryptoWallet, index) => (
          <CryptoWallet cryptoWallet={cryptoWallet} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CryptoWallets;
