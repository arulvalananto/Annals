import React from "react";

import PersonalTemplate from "../Template";
import Cards from "./Cards";

const CardTemplate = () => {
  return (
    <PersonalTemplate
      value="cards"
      title="Cards"
      name="card"
      Component={Cards}
    />
  );
};

export default CardTemplate;
