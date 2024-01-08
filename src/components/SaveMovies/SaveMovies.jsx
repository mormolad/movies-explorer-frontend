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
  bedInternet,
  isLoading,
  cards,
  isShortSaveFilms,
  setIsShortSaveFilms,
  setCards,
  isSearchSaveMovies,
  setIsSearchSaveMovies,
}) {
  const [isNotFound, setIsNotFound] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);

  function handlerSearchRequest(searchWord) {
    setIsNotFound(false);
    setIsSearchSaveMovies(true);
    const foundMovies = JSON.parse(localStorage.getItem('saveMovies')).filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchWord.toLowerCase())
    );
    if (foundMovies.length === 0) {
      setIsNotFound(true);
    } else if (isShortSaveFilms) {
      if (
        foundMovies.filter((film) => film.duration <= DURATION_SHORT_MOVIE)
          .length === 0
      ) {
        setIsNotFound(true);
      } else {
        setFoundMovies(foundMovies);
        setCards(
          foundMovies.filter((film) => film.duration <= DURATION_SHORT_MOVIE)
        );
      }
    } else {
      setFoundMovies(foundMovies);
      setCards(foundMovies);
    }
  }

  // инициализация страницы
  useEffect(() => {
    localStorage.setItem('shortSaveFilmStatusSwitch', JSON.parse(false));
    setIsShortSaveFilms(false);
    setIsNotFound(false);

    if (
      localStorage.getItem('saveMovies') === 'undefined' ||
      JSON.parse(localStorage.getItem('saveMovies')).length === 0 ||
      localStorage.getItem('saveMovies') === null
    ) {
      setIsNotFound(true);
    } else {
      console.log(JSON.parse(localStorage.getItem('saveMovies')));
      setCards(JSON.parse(localStorage.getItem('saveMovies')));
    }
    setIsSearchSaveMovies(false);
    setIsShortSaveFilms(false);
    console.log('render');
  }, []);

  useEffect(() => {
    if (!isSearchSaveMovies) {
      if (!isShortSaveFilms) {
        if (
          localStorage.getItem('saveMovies') === null ||
          localStorage.getItem('saveMovies') === 'undefined' ||
          localStorage.getItem('saveMovies').length === 0
        ) {
          setIsNotFound(true);
        } else {
          setCards(JSON.parse(localStorage.getItem('saveMovies')));
        }
      } else {
        const saveShortMovies = JSON.parse(
          localStorage.getItem('saveMovies')
        ).filter((film) => film.duration <= DURATION_SHORT_MOVIE);
        if (saveShortMovies.lenght === 0) {
          setIsNotFound(true);
        } else {
          setCards(
            JSON.parse(localStorage.getItem('saveMovies')).filter(
              (film) => film.duration <= DURATION_SHORT_MOVIE
            )
          );
        }
      }
    } else {
      if (!isShortSaveFilms) {
        if (
          foundMovies === null ||
          foundMovies === undefined ||
          foundMovies.length === 0
        ) {
          setIsNotFound(true);
        } else {
          setCards(foundMovies);
        }
      } else {
        const saveShortMovies = foundMovies.filter(
          (film) => film.duration <= DURATION_SHORT_MOVIE
        );
        if (saveShortMovies.lenght === 0) {
          setIsNotFound(true);
        } else {
          setCards(
            foundMovies.filter((film) => film.duration <= DURATION_SHORT_MOVIE)
          );
        }
      }
    }
  }, [isShortSaveFilms]);

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
