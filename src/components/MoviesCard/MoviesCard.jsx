import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import duration from '../../utils/durationMovie.js';
import {
  saveMovie,
  getSavedMovies,
  deleteMovies,
} from '../../utils/myAPIMovies.js';
function MoviesCard({ card, key }) {
  const [isLike, setIsLike] = useState(false);

  const setLike = (bool) => {
    console.log(bool);
    if (bool) {
      const respons = {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailer: card.trailerLink,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        thumbnail: `https://api.nomoreparties.co${
          card.image.previewUrl.split('\n/')[0]
        }`,
        movieId: card.id,
      };
      saveMovie(respons)
        .then((res) => {
          setIsLike(true);
        })
        .then(() => {
          getSavedMovies().then((res) =>
            localStorage.setItem('saveMovies', JSON.stringify(res))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const filteredCard = JSON.parse(
        localStorage.getItem('saveMovies')
      ).filter((movie) => movie.movieId === card.id);
      console.log(filteredCard);
      deleteMovies(filteredCard[0]._id).then((res) => {
        getSavedMovies().then((res) =>
          localStorage.setItem('saveMovies', JSON.stringify(res))
        );
        setIsLike(false);
      });
    }
  };

  useEffect(() => {
    getSavedMovies().then((res) => {
      localStorage.setItem('saveMovies', JSON.stringify(res.message));
    });
  }, [isLike]);

  useEffect(() => {
    console.log(card.like, card.nameRU);
    setIsLike(card.like);
  }, []);

  function handleLikeClick(e) {
    JSON.stringify(e.target.classList).indexOf('active') === -1
      ? setLike(true)
      : setLike(false);
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
      {
        <button
          className={
            isLike
              ? 'card__save-button card__save-button_active'
              : 'card__save-button'
          }
          onClick={handleLikeClick}
        ></button>
      }
    </li>
  );
}

export default MoviesCard;
