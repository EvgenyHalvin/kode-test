import React from "react";
import CardTemplate from "./CardTemplate";

function Card({ card, options }) {
  return (
    <>
      {!options.type && !options.subtype ? (
        <CardTemplate card={card} />
      ) : card.types.includes(options.type) && !options.subtype ? (
        <CardTemplate card={card} />
      ) : !options.type && card.subtypes.includes(options.subtype) ? (
        <CardTemplate card={card} />
      ) : card.types.includes(options.type) &&
        card.subtypes.includes(options.subtype) ? (
        <CardTemplate card={card} />
      ) : (
        console.log("Совпадения не найдены")
      )}
    </>
  );
}

export default Card;
