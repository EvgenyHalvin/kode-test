import { React } from "react";
import Card from "./Card";

function Cards({ cards }) {
  return (
    <div className="cards">
      {cards.map((item) => (
        <Card 
          key={item.id}
          card={item}
        />))}
    </div>
  );
}

export default Cards;
