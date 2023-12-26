import React, { useState, useEffect } from 'react';
import './SaveMovies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { DEVICE_PARAMS } from '../../constants/constForApi.js';
import { useResize } from '../../hooks/useResize.js';
import { getSavedMovies, deleteMovies } from '../../utils/myAPIMovies.js';

function SaveMovies({ isLoggedIn }) {
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [cards, setCards] = useState([]);
  const [bedInternet, setBedInternet] = useState(false);
  const [onReqSearch, setOnReqSearch] = useState(false);
  const [parametrsForView, setParametrsForView] = useState(
    DEVICE_PARAMS.desktop
  );

  const isSize = useResize();
  const [isNotFound, setIsNotFound] = useState(false);

  function handlerSearchRequest(searchWord) {
    const foundMovies = JSON.parse(localStorage.getItem('cardsSave')).filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchWord.toLowerCase())
    );
    localStorage.setItem('foundSaveMovies', JSON.stringify(foundMovies)); //заменить на cardsFound
    localStorage.setItem(
      'shortSaveFilmStatusSwitch',
      JSON.stringify(isShortFilms)
    );
    setOnReqSearch(true);
  }

  // инициализация страницы
  useEffect(() => {
    setOnReqSearch(false);
    getSavedMovies()
      .then((res) => {
        console.log(
          JSON.parse(
            localStorage.setItem('cardsSave', JSON.stringify(res.message))
          )
        );

        setIsNotFound(false);
        localStorage.setItem(
          'cardsSaveShortFilms',
          JSON.stringify(res.filter((film) => film.duration <= 40))
        );
        makeCollectionCards(
          JSON.parse(localStorage.getItem('cardsSave')),
          parametrsForView
        );
      })
      .catch((err) => setIsNotFound(true));
  }, []);

  function makeCollectionCards(cardsForCollection, paramsCollection) {
    const arrCards = [];
    for (let i = 0; i < paramsCollection.cards.total; i++) {
      if (!cardsForCollection[i]) {
        break;
      }
      arrCards[i] = cardsForCollection[i];
    }
    setCards(arrCards);
  }

  useEffect(() => {
    if (!isShortFilms && !onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('cardsSave')),
        parametrsForView
      );
    } else if (isShortFilms && !onReqSearch) {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('cardsShortFilms')),
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
  }, [isShortFilms, onReqSearch, isSize]);

  useEffect(() => {
    if (isSize > DEVICE_PARAMS.desktop.width) {
      setParametrsForView(DEVICE_PARAMS.desktop);
    } else if (isSize > DEVICE_PARAMS.tablet.width) {
      setParametrsForView(DEVICE_PARAMS.tablet);
    } else {
      setParametrsForView(DEVICE_PARAMS.mobile);
    }
  }, [isSize]);

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
            isLoading={true}
            hanleMore={() => {}}
            endCollection={true}
          />
        ) : (
          <Preloader className="not-found" text="Ничего не найдено" />
        )}
      </section>
      <Footer />
    </>
  );
}

export default SaveMovies;
