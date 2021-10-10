import { React } from "react";

import Card from "./Card";

function Cards({ cards, getPokemonInfo }) {
  return (
    <div className="cards">
      {cards.map((item) => (
        <Card 
          key={item.id}
          card={item}
          getPokemonInfo={getPokemonInfo}
        />))}
    </div>
  );
}

export default Cards;
