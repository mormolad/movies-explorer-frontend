import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './MoviesCard.css';
import duration from '../../utils/durationMovie.js';
import { saveMovie, deleteMovies } from '../../utils/mainAPI.js';
import { DURATION_SHORT_MOVIE } from '../../constants/config.js';
import Preloader from '../Preloader/Preloader';

function MoviesCard({
  card,
  setCards,
  setIsNotFound,
  isSearchSaveMovies,
  cards,
  isShortFilms,
  makeCollectionCards,
  setFoundMovies,
}) {
  const location = useLocation();
  const [isLike, setIsLike] = useState(card.like);
  const [isLoading, setIsLoading] = useState(false);

  const setLike = (bool) => {
    if (bool) {
      let respons = {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: card.image,
        trailer: card.trailerLink,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        thumbnail: card.image,
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
      ).filter((movie) => {
        return movie.movieId === card.id;
      });
      deleteMovies(filteredCard[0]._id)
        .then((res) => {
          delLikeLocalStorage(filteredCard[0]);
          setIsLike(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function setLikeLocalStorage(card) {
    let saveMovieLocalStorage = JSON.parse(localStorage.getItem('saveMovies'));
    if (
      localStorage.saveMovies === undefined ||
      JSON.parse(localStorage.getItem('saveMovies')).length === 0
    ) {
      saveMovieLocalStorage = [card];
      localStorage.setItem('saveMovies', JSON.stringify(saveMovieLocalStorage));
    } else {
      saveMovieLocalStorage[saveMovieLocalStorage.length] = card;
      localStorage.setItem('saveMovies', JSON.stringify(saveMovieLocalStorage));
    }
    setLikeCard(card);
  }

  function setLikeCard(card) {
    let cardsLocalStorage = JSON.parse(localStorage.getItem('cards'));
    cardsLocalStorage.forEach((item) => {
      if (item.id === card.movieId) {
        item.like = true;
      }
      localStorage.setItem('cards', JSON.stringify(cardsLocalStorage));
    });
    let foundCardsLocalStorage = JSON.parse(
      localStorage.getItem('foundMovies')
    );
    foundCardsLocalStorage.forEach((item) => {
      if (item.id === card.movieId) {
        item.like = true;
      }
    });
    localStorage.setItem('foundMovies', JSON.stringify(foundCardsLocalStorage));
    if (isShortFilms) {
      makeCollectionCards(
        foundCardsLocalStorage.filter(
          (film) => film.duration <= DURATION_SHORT_MOVIE
        )
      );
    } else {
      makeCollectionCards(foundCardsLocalStorage);
    }
  }

  function delLikeLocalStorage(card) {
    let saveMovieLocalStorage = JSON.parse(
      localStorage.getItem('saveMovies')
    ).filter((movie) => {
      return movie._id !== card._id;
    });
    localStorage.setItem('saveMovies', JSON.stringify(saveMovieLocalStorage));
    delLikeCard(card);
  }

  function delLikeCard(card) {
    let cardsLocalStorage = JSON.parse(localStorage.getItem('cards'));
    cardsLocalStorage.forEach((item) => {
      if (item.id === card.movieId) {
        item.like = false;
      }
      localStorage.setItem('cards', JSON.stringify(cardsLocalStorage));
    });
    let foundCardsLocalStorage = JSON.parse(
      localStorage.getItem('foundMovies')
    );
    foundCardsLocalStorage.forEach((item) => {
      if (item.id === card.movieId) {
        item.like = false;
      }
    });
    localStorage.setItem('foundMovies', JSON.stringify(foundCardsLocalStorage));
    if (isShortFilms) {
      makeCollectionCards(
        foundCardsLocalStorage.filter(
          (film) => film.duration <= DURATION_SHORT_MOVIE
        )
      );
    } else {
      makeCollectionCards(foundCardsLocalStorage);
    }
  }

  useEffect(() => {
    setIsLike(card.like);
  });

  function handleLikeClick(e) {
    setIsLoading(true);
    JSON.stringify(e.target.classList).indexOf('active') === -1
      ? setLike(true)
      : setLike(false);
  }

  function handleDelClick(e) {
    setIsLoading(true);
    if (!(JSON.parse(localStorage.getItem('saveMovies')) === null)) {
      const filteredCard = JSON.parse(
        localStorage.getItem('saveMovies')
      ).filter((movie) => movie.movieId === card.movieId);
      deleteMovies(filteredCard[0]._id)
        .then((res) => {
          if (localStorage.getItem('cards') !== null) {
            const newCollection = JSON.parse(localStorage.getItem('cards')).map(
              (item) => {
                if (item.id === res.message.movieId) {
                  item.like = false;
                }
                return item;
              }
            );
            localStorage.setItem('cards', JSON.stringify(newCollection));
          }
          if (localStorage.getItem('foundMovies') !== null) {
            const newCollection = JSON.parse(
              localStorage.getItem('foundMovies')
            ).map((item) => {
              if (item.id === res.message.movieId) {
                item.like = false;
              }
              return item;
            });
            localStorage.setItem('foundMovies', JSON.stringify(newCollection));
          }
          const allCardsForRender = JSON.parse(
            localStorage.getItem('saveMovies')
          ).filter((movies) => !(movies.movieId === card.movieId));
          setFoundMovies(allCardsForRender);
          localStorage.setItem('saveMovies', JSON.stringify(allCardsForRender));
          if (allCardsForRender.length === 0) {
            setIsNotFound(true);
          } else {
            if (isSearchSaveMovies) {
              const cardsFilter = cards.filter((item) => {
                return !(item.movieId === filteredCard[0].movieId);
              });
              cardsFilter.length > 0
                ? setCards(
                    !isShortFilms
                      ? cardsFilter
                      : cardsFilter.filter(
                          (film) => film.duration <= DURATION_SHORT_MOVIE
                        )
                  )
                : setIsNotFound(true);
            } else {
              allCardsForRender.length > 0
                ? setCards(
                    !isShortFilms
                      ? allCardsForRender
                      : allCardsForRender.filter(
                          (film) => film.duration <= DURATION_SHORT_MOVIE
                        )
                  )
                : setIsNotFound(true);
            }
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setIsNotFound(true);
    }
  }

  return (
    <li
      className="card"
      key={location.pathname === '/movies' ? card.id : card.movieId}
    >
      <div className="card__info">
        <h2 className="card__title">{card.nameRU}</h2>
        <span className="card__time">{duration(card.duration)}</span>
      </div>
      <Link
        to={location.pathname === '/movies' ? card.trailerLink : card.trailer}
      >
        <img className="card__image" alt={card.nameRU} src={card.image} />
      </Link>
      {isLoading ? (
        <Preloader classNameMod={'button'} />
      ) : (
        <button
          className={
            location.pathname === '/saved-movies'
              ? `card__save-button_delete`
              : isLike
              ? `card__save-button card__save-button_active`
              : `card__save-button`
          }
          onClick={
            location.pathname === '/saved-movies'
              ? handleDelClick
              : handleLikeClick
          }
          disabled={isLoading}
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
