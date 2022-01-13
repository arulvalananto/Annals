import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import BackButton from "../../../components/BackButton";
import Card from "./Card";

const Cards = () => {
  const history = useHistory();

  const { cards } = useSelector((state) => state.personal);

  if (!cards.length) {
    history.push("/personal");
  }

  console.log(cards);

  return (
    <div className="p-1 sm:p-5">
      <BackButton />
      <h2 className="font-bold text-3xl my-5 capitalize">Cards</h2>
      <div className="flex items-center gap-3 flex-wrap">
        {cards.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
