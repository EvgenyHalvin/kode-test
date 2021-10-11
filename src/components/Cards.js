import { React } from "react";

import Card from "./Card";

function Cards({ cards, getPokemonInfo, isGotItems, setCardInfo, openFullImage }) {
  return (
    <div className="cards">
      {isGotItems ? (
        <div className="wrap-for-loader">
          <div className="cardsLoader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        cards.map((item) => (
          <Card key={item.id} card={item} getPokemonInfo={getPokemonInfo} setCardInfo={setCardInfo} openFullImage={openFullImage} />
        ))
      )}
    </div>
  );
}

export default Cards;
