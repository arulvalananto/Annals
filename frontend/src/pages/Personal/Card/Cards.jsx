import { useSelector } from "react-redux";

import Card from "./Card";

const Cards = () => {
  const {
    docs: { cards },
  } = useSelector((state) => state.personal);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {cards.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </div>
  );
};

export default Cards;
