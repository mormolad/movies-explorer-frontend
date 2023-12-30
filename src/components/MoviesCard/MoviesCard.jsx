import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './MoviesCard.css';
import duration from '../../utils/durationMovie.js';
import {
  saveMovie,
  getSavedMovies,
  deleteMovies,
} from '../../utils/myAPIMovies.js';

function MoviesCard({ card, /* key,*/ setCards, setIsNotFound }) {
  const location = useLocation();
  const [isLike, setIsLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
          getMoviesMyAPI();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const filteredCard = JSON.parse(
        localStorage.getItem('saveMovies')
      ).filter((movie) => movie.movieId === card.id);
      deleteMovies(filteredCard[0]._id).then((res) => {
        getMoviesMyAPI();
        setIsLike(false);
      });
    }
  };

  function getMoviesMyAPI() {
    getSavedMovies()
      .then((res) => {
        localStorage.setItem('saveMovies', JSON.stringify(res.message));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setIsLike(card.like);
  }, []);

  function handleLikeClick(e) {
    setIsLoading(true);
    JSON.stringify(e.target.classList).indexOf('active') === -1
      ? setLike(true)
      : setLike(false);
  }

  function handleDelClick(e) {
    const filteredCard = JSON.parse(localStorage.getItem('saveMovies')).filter(
      (movie) => movie.movieId === card.movieId
    );
    deleteMovies(filteredCard[0]._id).then((res) => {
      const newCollectionCardInLocalStorage = JSON.parse(
        localStorage.getItem('saveMovies')
      ).filter((movies) => !(movies.movieId === card.movieId));
      localStorage.setItem(
        'saveMovies',
        JSON.stringify(newCollectionCardInLocalStorage)
      );
      const cardsForRender = newCollectionCardInLocalStorage.map((item) => {
        const image = { url: item.image.slice(29) };
        delete item.image;
        item = { ...item, image };
        return item;
      });
      cardsForRender.length === 0
        ? setIsNotFound(true)
        : setCards(cardsForRender);
    });
  }

  return (
    <li className="card" key={card.id}>
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
          onClick={
            location.pathname === '/saved-movies'
              ? handleDelClick
              : handleLikeClick
          }
          disabled={isLoading}
        ></button>
      }
    </li>
  );
}

export default MoviesCard;
