import React from "react";
import { useSelector } from "react-redux";
import { selectWallets } from "../../../store/reducers/personal.reducer";

import CryptoWallet from "./Wallet";

const Wallets = ({ handleDeleteMode }) => {
  const wallets = useSelector(selectWallets);

  if (!wallets.length) {
    return <p className="text-center text-gray-600">Nothing found 😑</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {wallets.map((cryptoWallet, index) => (
        <CryptoWallet
          cryptoWallet={cryptoWallet}
          key={index}
          handleDeleteMode={handleDeleteMode}
        />
      ))}
    </div>
  );
};

export default Wallets;
