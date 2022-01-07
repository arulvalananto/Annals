import React from "react";

import { ReactComponent as Chip } from "../assets/credit-card-chip.svg";
import BackButton from "../components/BackButton";

const Cards = () => {
  return (
    <div className="p-1 sm:p-5">
      <BackButton />
      <h2 className="font-bold text-3xl my-5 capitalize">Cards</h2>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="w-full sm:w-80 border-2 h-40 rounded font-jura relative  bg-cover text-white">
          <p className="font-poppins absolute top-2 left-2 uppercase">
            State bank of india
          </p>
          <p className="uppercase absolute top-2 right-2">Mastercard</p>
          <div className="w-12 h-9 absolute top-9 left-2 text-white">
            <Chip className="text-white" />
          </div>
          <p className="absolute bottom-10 left-2">0808 0808 0808 0808</p>
          <p className="absolute bottom-10 right-2">01 / 24</p>
          <p className="uppercase absolute bottom-2 left-2">
            Arul Valan Anto S
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
