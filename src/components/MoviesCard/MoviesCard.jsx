import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './MoviesCard.css';
import duration from '../../utils/durationMovie.js';
import {
  saveMovie,
  getSavedMovies,
  deleteMovies,
} from '../../utils/myAPIMovies.js';

function MoviesCard({ card, key }) {
  const [isLike, setIsLike] = useState(false);
  const location = useLocation();
  console.log(location);
  const setLike = (bool) => {
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
          localStorage.setItem('saveMovies', JSON.stringify(res.message));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const filteredCard = JSON.parse(
        localStorage.getItem('saveMovies')
      ).filter((movie) => movie.movieId === card.id);
      deleteMovies(filteredCard[0]._id).then((res) => {
        localStorage.setItem('saveMovies', JSON.stringify(res.message));
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
    setIsLike(card.like);
  }, []);

  function handleLikeClick(e) {
    JSON.stringify(e.target.classList).indexOf('active') === -1
      ? setLike(true)
      : setLike(false);
  }
  // console.log(card.image.slice(29));
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
            location.pathname === '/saved-movies'
              ? 'card__delete-button'
              : isLike
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
