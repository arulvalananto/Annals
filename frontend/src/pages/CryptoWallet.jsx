import React, { useState } from "react";
import QRCode from "qrcode.react";
import { ContentPaste, Visibility, VisibilityOff } from "@mui/icons-material";

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

  const [show, setShow] = useState({
    privateAddress: "",
    passPhrase: "",
  });

  const handleShow = (value) => {
    setShow({ ...show, [value]: !show[value] });
  };

  return (
    <div className="flex flex-col w-72 bg-mildgray rounded p-4">
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
              <label className="text-xs mb-1 text-gray-600 capitalize">
                {title}
              </label>
              <div className="group flex items-center gap-2">
                <input
                  type={show[select] ? "text" : "password"}
                  disabled
                  value={variable}
                  className="bg-mildgray"
                />
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    className="opacity-0 transform transition-opacity hover:scale-110 group-hover:opacity-100"
                  >
                    <ContentPaste fontSize="0.8rem" />
                  </button>
                  {!show[select] ? (
                    <button
                      type="button"
                      className="opacity-0 transform transition-opacity hover:scale-110 group-hover:opacity-100"
                      onClick={() => handleShow(select)}
                    >
                      <VisibilityOff fontSize="0.8rem" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="opacity-0 transform transition-opacity hover:scale-110 group-hover:opacity-100"
                      onClick={() => handleShow(select)}
                    >
                      <Visibility fontSize="0.8rem" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default CryptoWallet;
