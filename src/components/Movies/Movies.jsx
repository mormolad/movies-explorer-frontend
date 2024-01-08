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
  isLoggedIn,
  parametrsForView,
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
}) {
  useEffect(() => {
    if (localStorage.getItem('foundMovies') === null) {
      setIsNotFound(true);
    } else {
      !isShortFilms
        ? makeCollectionCards(
            JSON.parse(localStorage.getItem('foundMovies')),
            parametrsForView
          )
        : makeCollectionCards(
            JSON.parse(localStorage.getItem('foundMovies')).filter(
              (film) => film.duration <= DURATION_SHORT_MOVIE
            ),
            parametrsForView
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
          ),
          parametrsForView
        );
      } else {
        console.log(JSON.parse(localStorage.getItem('foundMovies')));
        makeCollectionCards(
          JSON.parse(localStorage.getItem('foundMovies')),
          parametrsForView
        );
      }
    }
    console.log('rerender');
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
        <SearchForm
          onSearch={handlerSearchRequest}
          setIsShortFilms={setIsShortFilms}
          searchWord={JSON.parse(localStorage.getItem('searchWord'))}
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

export default Movies;
