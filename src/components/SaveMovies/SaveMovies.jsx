import React, { useState, useEffect } from 'react';
import './SaveMovies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import ErrorSearch from '../ErrorSearch/ErrorSearch.jsx';
import { DURATION_SHORT_MOVIE } from '../../constants/config.js';

function SaveMovies({
  isLoggedIn,
  parametrsForView,
  bedInternet,
  isLoading,
  makeCollectionCards,
  isSize,
  cards,
  isShortFilms,
  setIsShortFilms,
  setCards,
}) {
  const [isNotFound, setIsNotFound] = useState(false);

  function handlerSearchRequest(searchWord) {
    setIsNotFound(false);
    const foundMovies = JSON.parse(localStorage.getItem('saveMovies')).filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchWord.toLowerCase())
    );
    localStorage.setItem('foundSaveMovies', JSON.stringify(foundMovies));
    localStorage.setItem(
      'shortSaveFilmStatusSwitch',
      JSON.stringify(isShortFilms)
    );
    localStorage.setItem('searchWordSaveMovies', JSON.stringify(searchWord));
    if (foundMovies.length === 0 || foundMovies === null) setIsNotFound(true);
  }

  // инициализация страницы
  useEffect(() => {
    setIsNotFound(false);
    if (
      localStorage.getItem('saveMovies') === 'undefined' ||
      localStorage.getItem('saveMovies') === '[]'
    ) {
      setIsNotFound(true);
    } else {
      makeCollectionCards(
        setCorrectImage(JSON.parse(localStorage.getItem('saveMovies'))),
        parametrsForView
      );
    }
  }, []);

  useEffect(() => {
    if (!isShortFilms) {
      makeCollectionCards(
        setCorrectImage(JSON.parse(localStorage.getItem('saveMovies'))),
        parametrsForView
      );
    } else if (isShortFilms) {
      makeCollectionCards(
        setCorrectImage(JSON.parse(localStorage.getItem('saveMovies'))).filter(
          (film) => film.duration <= DURATION_SHORT_MOVIE
        ),
        parametrsForView
      );
    }
  }, [isShortFilms, isSize]);

  function setCorrectImage(cardsCollection) {
    const saveMovie = cardsCollection.map((item) => {
      const link = item.image;
      delete item.image;
      item.image = { url: link.slice(29) };
      return item;
    });

    return saveMovie;
  }

  useEffect(() => {
    if (!(localStorage.getItem('saveMovies') === 'undefined')) {
      if (!isShortFilms) {
        makeCollectionCards(
          setCorrectImage(JSON.parse(localStorage.getItem('saveMovies'))),
          parametrsForView
        );
      } else {
        makeCollectionCards(
          setCorrectImage(
            JSON.parse(localStorage.getItem('saveMovies')).filter(
              (film) => film.duration <= DURATION_SHORT_MOVIE
            )
          ),
          parametrsForView
        );
      }
    }
  }, [isShortFilms, isSize, parametrsForView]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
        <SearchForm
          onSearch={handlerSearchRequest}
          setIsShortFilms={setIsShortFilms}
          searchWord={JSON.parse(localStorage.getItem('searchWordSaveMovies'))}
        />
        {bedInternet ? (
          <ErrorSearch
            className="not-found"
            text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          />
        ) : !isNotFound ? (
          isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              cards={cards}
              isLoading={isLoading}
              hanleMore={() => {}}
              endCollection={true}
              setIsNotFound={setIsNotFound}
              setCards={setCards}
            />
          )
        ) : (
          <ErrorSearch className="not-found" text="Ничего не найдено" />
        )}
      </section>
      <Footer />
    </>
  );
}

export default SaveMovies;
