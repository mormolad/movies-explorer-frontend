import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import ErrorSearch from '../ErrorSearch/ErrorSearch.jsx';
import { DURATION_SHORT_MOVIE } from '../../constants/config.js';

function Movies({
<<<<<<< HEAD
  isLoggedIn,
  bedInternet,
  isLoading,
  makeCollectionCards,
  cards,
  handleMore,
  setIsNotFound,
  handlerSearchRequest,
  setIsFirstSearch,
  isFirstSearch,
  isShortFilms,
  setIsShortFilms,
  endCollection,
  isNotFound,
  additionalMovies,
  isSize,
  setAdditionalMovies,
  setCards,
  isFormBlock,
  setIsFormBlock,
}) {
  useEffect(() => {
    setIsNotFound(false);
    if (localStorage.getItem('foundMovies') === null) {
      setIsNotFound(true);
    } else {
      !isShortFilms
        ? makeCollectionCards(JSON.parse(localStorage.getItem('foundMovies')))
        : makeCollectionCards(
            JSON.parse(localStorage.getItem('foundMovies')).filter(
              (film) => film.duration <= DURATION_SHORT_MOVIE
            )
          );
    }
  }, [isShortFilms, isSize, additionalMovies]);

  useEffect(() => {
    setAdditionalMovies(0);
    if (localStorage.getItem('foundMovies') === null) {
      setIsFirstSearch(true);
    } else if (JSON.parse(localStorage.getItem('foundMovies')).length === 0) {
      setIsFirstSearch(false);
      setIsNotFound(true);
    } else {
      setIsFirstSearch(false);
      setIsNotFound(false);
      if (localStorage.getItem('shortFilmStatusSwitch') === 'true') {
        makeCollectionCards(
          JSON.parse(localStorage.getItem('foundMovies')).filter(
            (film) => film.duration <= DURATION_SHORT_MOVIE
          )
        );
      } else {
        makeCollectionCards(JSON.parse(localStorage.getItem('foundMovies')));
      }
    }
  }, []);

=======
  onSearchMovies,
  movies,
  isLoggedIn,
  isSavedFilms,
  isLoading,
}) {
>>>>>>> 0d7fd1aad5739a13e831b4132c0af311662b7bb5
  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
<<<<<<< HEAD
        <SearchForm
          onSearch={handlerSearchRequest}
          setIsShortFilms={setIsShortFilms}
          searchWord={JSON.parse(localStorage.getItem('searchWord'))}
          isFormBlock={isFormBlock}
          setIsFormBlock={setIsFormBlock}
        />
        {isFirstSearch ? (
          ''
        ) : bedInternet ? (
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
              handleMore={handleMore}
              endCollection={endCollection}
              isLoading={isLoading}
              setCards={setCards}
              isShortFilms={isShortFilms}
              makeCollectionCards={makeCollectionCards}
            />
          )
        ) : (
          <ErrorSearch className="not-found" text="Ничего не найдено" />
        )}
=======
        <SearchForm onSearchMovies={onSearchMovies} />
        <MoviesCardList
          cards={movies}
          isSavedFilms={isSavedFilms}
          isLoading={isLoading}
        />
>>>>>>> 0d7fd1aad5739a13e831b4132c0af311662b7bb5
      </section>
      <Footer />
    </>
  );
}

export default Movies;
