import React from "react";
import QRCode from "qrcode.react";
import { ContentPaste, Delete, Edit } from "@mui/icons-material";

import IconButton from "../../../components/IconButton";

const CryptoWallet = ({
  cryptoWallet: { publicAddress, privateAddress, passPhrase },
}) => {
  const data = [
    {
      variable: privateAddress,
      title: "private address",
      select: "privateAddress",
    },
    {
      variable: passPhrase,
      title: "pass phrase",
      select: "passPhrase",
    },
  ];

  return (
    <div className="flex flex-col w-72 bg-mildgray rounded p-4 relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <IconButton Icon={Delete} color="danger" />
        <IconButton Icon={Edit} color="moderate" />
      </div>
      {publicAddress && (
        <>
          <label className="text-xs mb-1 text-gray-600">Public Address</label>
          <QRCode value={publicAddress} size={64} level="M" />
        </>
      )}
      {data.map(({ variable, title, select }) => {
        return (
          variable && (
            <div>
              <label className="text-xs mb-1 text-gray-600 capitalize ">
                {title}
              </label>
              <div className="group flex items-center gap-2">
                <input
                  type="password"
                  disabled
                  value={variable}
                  className="bg-mildgray"
                />
                <button type="button">
                  <IconButton Icon={ContentPaste} />
                </button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default CryptoWallet;
