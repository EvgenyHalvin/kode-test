import React from 'react';

function CardTemplate({ card }) {
  
  return(
    <div className="card">
      <div style={{backgroundImage: `url(${card.images.small})`}} className="card__image"></div>
      <div className="card__name">{card.name}</div>
      <div className="card__subtitle">{card.artist}</div>
    </div>
  )
}

export default CardTemplate;