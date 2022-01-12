import React from "react";
import moment from "moment";

import { ReactComponent as Chip } from "../assets/credit-card-chip.svg";

const Card = ({
  card: { bankName, providerName, cardNumber, accountHolderName, expiry },
}) => {
  return (
    <div className="w-full sm:w-80 border-2 h-40 rounded font-jura relative  bg-cover text-white">
      <p className="font-poppins absolute top-2 left-2 uppercase">
        {bankName || ""}
      </p>
      <p className="uppercase absolute top-2 right-2">{providerName || ""}</p>
      <div className="w-12 h-9 absolute top-9 left-2 text-white">
        <Chip className="text-white" />
      </div>
      <p className="absolute bottom-10 left-2">{cardNumber}</p>
      <p className="absolute bottom-10 right-2">
        {moment(expiry).format("M")} / {moment(expiry).format("YY")}
      </p>
      <p className="uppercase absolute bottom-2 left-2">{accountHolderName}</p>
    </div>
  );
};

export default Card;
