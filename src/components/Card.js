import React from "react";
import { Link } from "react-router-dom";

function Card({ card, getPokemonInfo, setCardInfo, openFullImage }) {
  return (
    <>
      <div className="card">
        <div
          style={{ backgroundImage: `url(${card.images.small})` }}
          className="card__image"
          onClick={() => {
            setCardInfo(card);
            openFullImage();
          }}
        >
          <span
            className="card__quick-view"
          ></span>
        </div>
        <div className="card__description">
          <div className="card__name">{card.name}</div>
          <div className="card__subtitle">
            Автор:<p>{card.artist}</p>
          </div>
          <Link
            to={`/pokemon/${card.name}`}
            className="card__link"
            onClick={() => {getPokemonInfo(card)}}
          >
            Подробнее
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;
