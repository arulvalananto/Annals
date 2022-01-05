import React from "react";

import { ReactComponent as Chip } from "../assets/credit-card-chip.svg";

const Cards = () => {
  return (
    <div className="p-1 sm:p-5">
      <h2 className="font-bold text-3xl mb-5">Cards</h2>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="sm:w-80 bg-red-500 h-40 rounded font-jura relative bg-credit-card-1 bg-cover text-white mb-5">
          <p className="font-poppins absolute top-2 left-2">Bank Name</p>
          <p className="uppercase absolute top-2 right-2">Service</p>
          <div className="w-12 h-9 absolute top-9 left-2 text-white">
            <Chip className="text-white" />
          </div>
          <p className="absolute bottom-10 left-2">0808 0808 0808 0808</p>
          <p className="absolute bottom-10 right-2">01 / 24</p>
          <p className="uppercase absolute bottom-2 left-2">Name</p>
        </div>
        <div className="sm:w-80 bg-red-500 h-40 rounded font-jura relative bg-credit-card-1 bg-cover text-white">
          <p className="font-poppins absolute top-2 left-2">Bank Name</p>
          <p className="uppercase absolute top-2 right-2">Service</p>
          <div className="w-12 h-9 absolute top-9 left-2 text-white">
            <Chip className="text-white" />
          </div>
          <p className="absolute bottom-10 left-2">0808 0808 0808 0808</p>
          <p className="absolute bottom-10 right-2">01 / 24</p>
          <p className="uppercase absolute bottom-2 left-2">Name</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
