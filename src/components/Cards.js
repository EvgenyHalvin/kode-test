import { React } from "react";
import Card from "./Card";

function Cards({ cards, options }) {
  return (
    <div className="cards">
      {cards.map((item) => (
        <Card 
          key={item.id}
          card={item}
          options={options}
        />))}
    </div>
  );
}

export default Cards;
