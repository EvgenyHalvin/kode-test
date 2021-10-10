import React from "react";
import { Link } from "react-router-dom";

function Card({ card, getPokemonInfo }) {

  return (
    <div className="card">
      <div
        style={{ backgroundImage: `url(${card.images.small})` }}
        className="card__image"
      ></div>
      <div className="card__name">{card.name}</div>
      <div className="card__subtitle">{card.artist}</div>
      <Link to={`/pokemon/${card.name}`} onClick={() => getPokemonInfo(card)}>Подробнее</Link>
    </div>
  );
}

export default Card;
