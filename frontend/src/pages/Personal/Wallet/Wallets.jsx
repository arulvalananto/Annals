import React from "react";
import { useSelector } from "react-redux";

import CryptoWallet from "./Wallet";

const Wallets = ({ handleDeleteMode }) => {
  const {
    docs: { cryptoWallets },
  } = useSelector((state) => state.personal);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {cryptoWallets.map((cryptoWallet, index) => (
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
