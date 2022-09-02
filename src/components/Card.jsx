import React from "react";

const Card = ({ link, name, likesCount, onCardClick, card }) => {
  return (
    <div className="element">
      <button className="element__delete" type="button"></button>
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />
      <div className="element__mask-group">
        <h2 className="element__title">{name}</h2>
        <div className="element__vector_container">
          <button type="button" className="element__vector"></button>
          <span className="element__vector-counter">{likesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
