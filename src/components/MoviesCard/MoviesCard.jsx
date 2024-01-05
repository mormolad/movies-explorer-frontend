import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './MoviesCard.css';
import duration from '../../utils/durationMovie.js';
import { saveMovie, deleteMovies } from '../../utils/mainAPI.js';

function MoviesCard({ card, setCards, setIsNotFound }) {
  const location = useLocation();
  const [isLike, setIsLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(card);
  const setLike = (bool) => {
    if (bool) {
      let respons = {
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
          respons = { ...respons, _id: res.message._id };
          setLikeLocalStorage(respons);
          setIsLike(true);
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
      deleteMovies(filteredCard[0]._id)
        .then((res) => {
          delLikeLocalStorage(filteredCard[0]._id);
          setIsLike(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function setLikeLocalStorage(card) {
    let saveMovieLocalStorage = JSON.parse(localStorage.getItem('saveMovies'));
    if (saveMovieLocalStorage === null || saveMovieLocalStorage === undefined) {
      saveMovieLocalStorage = [card];
      localStorage.setItem('saveMovies', JSON.stringify(saveMovieLocalStorage));
    } else {
      saveMovieLocalStorage[saveMovieLocalStorage.length] = card;
      localStorage.setItem('saveMovies', JSON.stringify(saveMovieLocalStorage));
    }
  }

  function delLikeLocalStorage(id) {
    console.log(
      JSON.parse(localStorage.getItem('saveMovies')).filter(
        (movie) => movie._id !== id
      )
    );
    let saveMovieLocalStorage = JSON.parse(
      localStorage.getItem('saveMovies')
    ).filter((movie) => movie._id !== id);
    localStorage.setItem('saveMovies', JSON.stringify(saveMovieLocalStorage));
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
      <Link to={card.trailerLink}>
        <img
          className="card__image"
          alt={card.nameRU}
          src={`https://api.nomoreparties.co/${card.image.url}`}
        />
      </Link>
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
