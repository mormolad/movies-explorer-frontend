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
  isShortSaveFilms,
  setIsShortSaveFilms,
  setCards,
  handlerSearchRequest,
  setCorrectImage,
  isSearchSaveMovies,
  cardsForSaveMovie,
  setCardsForSaveMovie,
}) {
  const [isNotFound, setIsNotFound] = useState(false);
  //const [cardsForSaveMovie, setCardsForSaveMovie] = useState([]);
  // инициализация страницы
  useEffect(() => {
    setIsShortSaveFilms(false);
    setIsNotFound(false);
    if (
      localStorage.getItem('saveMovies') === 'undefined' ||
      localStorage.getItem('saveMovies') === [] ||
      localStorage.getItem('saveMovies') === null
    ) {
      setIsNotFound(true);
    } else {
      setCardsForSaveMovie(JSON.parse(localStorage.getItem('saveMovies')));
      makeCollectionCards(
        setCorrectImage(JSON.parse(localStorage.getItem('saveMovies'))),
        parametrsForView
      );
    }
  }, []);

  function showSaveMovies() {
    makeCollectionCards(setCorrectImage(cardsForSaveMovie), parametrsForView);
  }

  function showShortSaveMovies() {
    makeCollectionCards(
      setCorrectImage(JSON.parse(localStorage.getItem('saveMovies'))).filter(
        (film) => film.duration <= DURATION_SHORT_MOVIE
      ),
      parametrsForView
    );
  }

  useEffect(() => {
    if (!isShortSaveFilms) {
      if (
        localStorage.getItem('saveMovies') === null ||
        localStorage.getItem('saveMovies') === 'undefined' ||
        localStorage.getItem('saveMovies').length === 0
      ) {
        setIsNotFound(true);
      } else {
        showSaveMovies();
      }
    } else {
      const saveShortMovies = JSON.parse(
        localStorage.getItem('saveMovies')
      ).filter((film) => film.duration <= DURATION_SHORT_MOVIE);
      if (saveShortMovies.lenght === 0) {
        setIsNotFound(true);
      } else {
        showShortSaveMovies();
      }
    }
  }, [isShortSaveFilms, isSize, parametrsForView]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
        <SearchForm
          onSearch={handlerSearchRequest}
          setIsShortFilms={setIsShortSaveFilms}
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
              isSearchSaveMovies={isSearchSaveMovies}
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
