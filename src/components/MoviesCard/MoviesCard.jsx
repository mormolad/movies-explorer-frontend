import React from 'react';
import './MoviesCard.css';
import duration from '../../utils/durationMovie.js';

function MoviesCard({ card, isSavedFilms }) {
  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__title">{card.nameRU}</h2>
        <span className="card__time">{duration(card.duration)}</span>
      </div>
      <img
        className="card__image"
        alt={card.nameRU}
        src={`https://api.nomoreparties.co/${card.image.url}`}
      />
      {isSavedFilms ? (
        <button className="card__button card__button_delete"></button>
      ) : (
        <button
          className={
            card.saved
              ? 'card__button  card__button_saved'
              : 'card__button card__button_no-saved'
          }
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
