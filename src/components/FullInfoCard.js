import React from "react";
import { Link } from "react-router-dom";

import { PocemonFullInfoContext } from "../contexts/pocemonFullInfoContext.js";

function FullInfoCard() {
  const pokemon = React.useContext(PocemonFullInfoContext);
  
  return (
    <div className="full">
      <section className="full__left-side">
        <div className="full__image" style={{ backgroundImage: `url(${pokemon.images.large})` }} />
      </section>
      <section className="full__right-side">
        <h1 className="full__title">{pokemon.name}</h1>
        <p className="full__subtitle">Супертип: {pokemon.supertype}</p>
        <p className="full__subtitle">Тип: {pokemon.types}</p>
        <p className="full__subtitle">Подтип: {pokemon.subtypes}</p>
        <span className="full__line"></span>
        <p className="full__subtitle">Урон от атаки: {pokemon.attacks[0].damage ? pokemon.attacks[0].damage : "урон не указан или отсутствует"}</p>
        <p className="full__subtitle">Затраты на атаку: {pokemon.attacks[0].cost[0] ? pokemon.attacks[0].cost[0] : "затраты не указаны или отсутствуют"}</p>
        <p className="full__subtitle">Слабости: {pokemon.weaknesses ? pokemon.weaknesses[0].type : "нет слабостей"}</p>
        <p className="full__subtitle">Кол-во здоровья: {pokemon.hp}hp</p>
        <p className="full__description">Описание: {pokemon.flavorText}</p>
        <Link to="/pokemon" className="full__link">Назад</Link>
      </section>
    </div>
  );
}

export default FullInfoCard;
