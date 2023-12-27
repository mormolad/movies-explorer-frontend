import React, { useState, useEffect } from 'react';
import './SaveMovies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { DEVICE_PARAMS } from '../../constants/constForApi.js';
import { getSavedMovies, deleteMovies } from '../../utils/myAPIMovies.js';
import ErrorSearch from '../ErrorSearch/ErrorSearch.jsx';

function SaveMovies({ isLoggedIn, parametrsForView, bedInternet, isLoading }) {
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [cards, setCards] = useState([]);
  const [onReqSearch, setOnReqSearch] = useState(false);

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
    setOnReqSearch(true);
    if (foundMovies.length === 0) setIsNotFound(true);
  }

  // инициализация страницы
  useEffect(() => {
    setOnReqSearch(false);
    setIsNotFound(false);
    makeCollectionCards(
      JSON.parse(localStorage.getItem('saveMovies')),
      parametrsForView
    );
  }, []);

  function makeCollectionCards(cardsForCollection, paramsCollection) {
    const arrCards = [];
    for (let i = 0; i < paramsCollection.cards.total; i++) {
      if (!cardsForCollection[i]) {
        break;
      }
      console.log(cardsForCollection[i].image);
      const image = { url: cardsForCollection[i].image.slice(29) };
      delete cardsForCollection[i].image;
      cardsForCollection[i] = { ...cardsForCollection[i], image };
      console.log(cardsForCollection[i]);
      arrCards[i] = cardsForCollection[i];
    }

    console.log(arrCards);
    setCards(arrCards);
  }

  useEffect(() => {
    if (!isShortFilms && !onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('saveMovies')),
        parametrsForView
      );
    } else if (isShortFilms && !onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('saveMovieShort')),
        parametrsForView
      );
    } else if (!isShortFilms && onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('foundSaveMovies')),
        parametrsForView
      );
    } else if (isShortFilms && onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('foundSaveMovies')).filter(
          (film) => film.duration <= 40
        ),
        parametrsForView
      );
    }
  }, [isShortFilms, onReqSearch /*isSize*/]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
        <SearchForm
          onSearch={handlerSearchRequest}
          setIsShortFilms={setIsShortFilms}
          searchWord={JSON.parse(localStorage.getItem('searchWordSaveMovies'))}
        />
        {!isLoading ? (
          bedInternet ? (
            <Preloader text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз/" />
          ) : !isNotFound ? (
            <MoviesCardList
              cards={cards}
              isLoading={isLoading}
              hanleMore={() => {}}
              endCollection={true}
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

export default SaveMovies;
