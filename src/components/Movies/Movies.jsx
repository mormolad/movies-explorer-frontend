import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { useResize } from '../../hooks/useResize.js';
import ErrorSearch from '../ErrorSearch/ErrorSearch.jsx';
import {
  saveMovie,
  getSavedMovies,
  deleteMovies,
} from '../../utils/myAPIMovies.js';

function Movies({ isLoggedIn, parametrsForView, bedInternet, isLoading }) {
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [cards, setCards] = useState([]);
  const [onReqSearch, setOnReqSearch] = useState(false);

  const [additionalMovies, setAdditionalMovies] = useState(0);
  const isSize = useResize();
  const [endCollection, setEndCollection] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  function handlerSearchRequest(searchWord) {
    setIsNotFound(false);
    const foundMovies = JSON.parse(localStorage.getItem('cards')).filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchWord.toLowerCase())
    );
    console.log(foundMovies);
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('shortFilmStatusSwitch', JSON.stringify(isShortFilms));
    localStorage.setItem('searchWord', JSON.stringify(searchWord));
    setCards(foundMovies);
    setOnReqSearch(true);
    if (foundMovies.length === 0) setIsNotFound(true);
  }

  // инициализация страницы
  useEffect(() => {
    setAdditionalMovies(0);
    setEndCollection(false);
    if (JSON.parse(localStorage.getItem('foundMovies')) === null) {
      setOnReqSearch(false);
    } else if (JSON.parse(localStorage.getItem('foundMovies')).length === 0) {
      setIsNotFound(true);
      setOnReqSearch(true);
    } else {
      setOnReqSearch(true);
      setIsNotFound(false);
      makeCollectionCards(
        JSON.parse(localStorage.getItem('foundMovies')),
        parametrsForView
      );
    }
  }, []);

  function setLike(card) {
    if (
      localStorage.getItem('saveMovies') === null ||
      localStorage.getItem('saveMovies') === 'undefined' //выяснеить где прилетает
    ) {
      return false;
    } else if (JSON.parse(localStorage.getItem('saveMovies')).length === 0) {
      return false;
    } else {
      const like = JSON.parse(localStorage.getItem('saveMovies')).filter(
        (movie) => card.nameRU === movie.nameRU
      );
      return like.length > 0;
    }
  }

  function makeCollectionCards(cardsForCollection, paramsCollection) {
    if (cardsForCollection === null) {
      return;
    }
    const arrCards = [];
    setEndCollection(false);
    for (let i = 0; i < paramsCollection.cards.total + additionalMovies; i++) {
      if (!cardsForCollection[i]) {
        setEndCollection(true);
        break;
      }
      cardsForCollection[i].like = setLike(cardsForCollection[i]);
      arrCards[i] = cardsForCollection[i];
    }
    setCards(arrCards);
  }

  useEffect(() => {
    if (!isShortFilms && !onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('cards')),
        parametrsForView
      );
    } else if (isShortFilms && !onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('cardsShortFilms')),
        parametrsForView
      );
    } else if (!isShortFilms && onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('foundMovies')),
        parametrsForView
      );
    } else if (isShortFilms && onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('foundMovies')).filter(
          (film) => film.duration <= 40
        ),
        parametrsForView
      );
    }
  }, [isShortFilms, onReqSearch, isSize, additionalMovies]);

  const handleMore = () => {
    setAdditionalMovies(additionalMovies + parametrsForView.cards.more);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
        <SearchForm
          onSearch={handlerSearchRequest}
          setIsShortFilms={setIsShortFilms}
          searchWord={JSON.parse(localStorage.getItem('searchWord'))}
        />
        {!isLoading ? (
          bedInternet ? (
            <Preloader text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз/" />
          ) : !isNotFound ? (
            <MoviesCardList
              cards={cards}
              handleMore={handleMore}
              endCollection={endCollection}
              isLoading={isLoading}
            />
          ) : (
            <ErrorSearch className="not-found" text="Ничего не найдено" />
          )
        ) : (
          <Preloader />
        )}
      </section>
      <Footer />
    </>
  );
}

export default Movies;
