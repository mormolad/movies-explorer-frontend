import React, { useState } from 'react';
import './MoviesCard.css';
import duration from '../../utils/durationMovie.js';
import { saveMovie } from '../../utils/myAPIMovies.js';
function MoviesCard({ card, isSavedFilms, key }) {
  const [isLike, setIsLike] = useState(false);

  const setLike = (bool) => {
    console.log(localStorage.getItem('cardsSave') === null);
    const cards = localStorage.getItem('cardsSave');
    console.log(cards);
    saveMovie()
      .then((res) => {
        bool ? setIsLike(true) : setIsLike(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function handleLikeClick(e) {
    console.log(JSON.stringify(e.target.classList).indexOf('active'));
    JSON.stringify(e.target.classList).indexOf('active') === -1
      ? setLike(true)
      : setLike(false);
    console.log(JSON.stringify(e.target.classList));
  }

  return (
    <li className="card" key={key}>
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
        <button className="card__delete-button"></button>
      ) : (
        <button
          className={
            isLike
              ? 'card__save-button card__save-button_active'
              : 'card__save-button'
          }
          onClick={handleLikeClick}
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
