import { useSelector } from "react-redux";
import { selectCards } from "../../../store/reducers/personal.reducer";

import Card from "./Card";

const Cards = ({ handleDeleteMode }) => {
  const cards = useSelector(selectCards);

  if (!cards.length) {
    return <p className="text-center text-gray-600">Nothing found 😑</p>;
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {cards.map((card, index) => (
        <Card card={card} key={index} handleDeleteMode={handleDeleteMode} />
      ))}
    </div>
  );
};

export default Cards;
