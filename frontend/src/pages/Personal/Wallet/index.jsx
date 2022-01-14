import React from "react";

import PersonalTemplate from "../Template";
import CryptoWallets from "./Wallets";

const WalletTemplate = () => {
  return (
    <PersonalTemplate
      value="cryptoWallets"
      title="Crypto Wallets"
      name="cryptoWallet"
      Component={CryptoWallets}
    />
  );
};

export default WalletTemplate;
