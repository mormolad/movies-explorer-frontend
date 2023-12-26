import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import getCards from '../../utils/MoviesApi';
import { DEVICE_PARAMS } from '../../constants/constForApi.js';
import { useResize } from '../../hooks/useResize.js';

function Movies({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [cards, setCards] = useState([]);
  const [bedInternet, setBedInternet] = useState(false);
  const [onReqSearch, setOnReqSearch] = useState(false);
  const [parametrsForView, setParametrsForView] = useState(
    DEVICE_PARAMS.desktop
  );
  const [additionalMovis, setAdditionalMovies] = useState(0);
  const isSize = useResize();
  const [endCollection, setEndCollection] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  function handlerSearchRequest(searchWord) {
    const foundMovies = JSON.parse(localStorage.getItem('cards')).filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchWord.toLowerCase())
    );
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('shortFilmStatusSwitch', JSON.stringify(isShortFilms));
    localStorage.setItem('searchWord', JSON.stringify(searchWord));
    setOnReqSearch(true);
  }

  // инициализация страницы
  useEffect(() => {
    setAdditionalMovies(0);
    setEndCollection(false);
    if (JSON.parse(localStorage.getItem('foundMovies')) === null) {
      setOnReqSearch(false);
      getCards()
        .then((res) => {
          setBedInternet(false);
          setIsLoading(false);
          console.log(JSON.stringify(res));
          localStorage.setItem('cards', JSON.stringify(res));
          localStorage.setItem(
            'cardsShortFilms',
            JSON.stringify(res.filter((film) => film.duration <= 40))
          );
          makeCollectionCards(
            JSON.parse(localStorage.getItem('cards')),
            parametrsForView
          );
        })
        .catch((err) => {
          console.log(err);
          setBedInternet(true);
        });
    } else if (JSON.parse(localStorage.getItem('foundMovies')).length === 0) {
      setIsLoading(false);
      setIsNotFound(true);
      setOnReqSearch(true);
    } else {
      setIsLoading(false);
      setOnReqSearch(true);
      setIsNotFound(false);
      makeCollectionCards(
        JSON.parse(localStorage.getItem('foundMovies')),
        parametrsForView
      );
    }
  }, []);

  function setLike(card) {
    if (localStorage.getItem('cardsSave') === null) {
      return false;
    } else if (JSON.parse(localStorage.getItem('cardsSave')).length === 0) {
      return false;
    } else {
      const like = JSON.parse(localStorage.getItem('cardsSave')).filter(
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
    for (let i = 0; i < paramsCollection.cards.total + additionalMovis; i++) {
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
  }, [isShortFilms, onReqSearch, isSize, additionalMovis]);

  useEffect(() => {
    if (isSize > DEVICE_PARAMS.desktop.width) {
      setParametrsForView(DEVICE_PARAMS.desktop);
    } else if (isSize > DEVICE_PARAMS.tablet.width) {
      setParametrsForView(DEVICE_PARAMS.tablet);
    } else {
      setParametrsForView(DEVICE_PARAMS.mobile);
    }
  }, [isSize]);

  const hanleMore = () => {
    setAdditionalMovies(additionalMovis + parametrsForView.cards.more);
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
        {bedInternet ? (
          <Preloader text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз/" />
        ) : !isNotFound ? (
          <MoviesCardList
            cards={cards}
            isLoading={isLoading}
            hanleMore={hanleMore}
            endCollection={endCollection}
          />
        ) : (
          <Preloader className="not-found" text="Ничего не найдено" />
        )}
      </section>
      <Footer />
    </>
  );
}

export default Movies;
