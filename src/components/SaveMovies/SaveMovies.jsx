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
}) {
  const [isNotFound, setIsNotFound] = useState(false);

  // инициализация страницы
  useEffect(() => {
    setIsNotFound(false);
    if (
      localStorage.getItem('saveMovies') === 'undefined' ||
      localStorage.getItem('saveMovies') === [] ||
      localStorage.getItem('saveMovies') === null
    ) {
      setIsNotFound(true);
    } else {
      makeCollectionCards(
        setCorrectImage(JSON.parse(localStorage.getItem('saveMovies'))),
        parametrsForView
      );
    }
  }, []);

  function checkSaveFilms(localStorageItem) {
    if (!isShortSaveFilms) {
      localStorage.getItem(localStorageItem) === null
        ? setIsNotFound(true)
        : makeCollectionCards(
            setCorrectImage(JSON.parse(localStorage.getItem(localStorageItem))),
            parametrsForView
          );
    } else if (isShortSaveFilms) {
      localStorage.getItem(localStorageItem) === null
        ? setIsNotFound(true)
        : makeCollectionCards(
            setCorrectImage(
              JSON.parse(localStorage.getItem(localStorageItem))
            ).filter((film) => film.duration <= DURATION_SHORT_MOVIE),
            parametrsForView
          );
    }
  }

  useEffect(() => {
    checkSaveFilms(!isSearchSaveMovies ? 'saveMovies' : 'foundSaveMovies');
    // if (!isShortSaveFilms) {
    //   makeCollectionCards(
    //     setCorrectImage(
    //       JSON.parse(
    //         localStorage.getItem(
    //           !isSearchSaveMovies ? 'saveMovies' : 'foundSaveMovies'
    //         )
    //       )
    //     ),
    //     parametrsForView
    //   );
    // } else if (isShortSaveFilms) {
    //   makeCollectionCards(
    //     setCorrectImage(
    //       JSON.parse(
    //         localStorage.getItem(
    //           !isSearchSaveMovies ? 'saveMovies' : 'foundSaveMovies'
    //         )
    //       )
    //     ).filter((film) => film.duration <= DURATION_SHORT_MOVIE),
    //     parametrsForView
    //   );
    // }
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
