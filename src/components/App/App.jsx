import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage.jsx';
import Movies from '../Movies/Movies.jsx';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import { chekTokenUser, register, authorize } from '../../utils/auth.js';
import Register from '../Register/Register.jsx';
import SaveMovies from '../SaveMovies/SaveMovies.jsx';
import {
  getSavedMovies,
  editProfile,
  getUserInfo,
} from '../../utils/mainAPI.js';
import getCards from '../../utils/moviesApi';
import { useResize } from '../../hooks/useResize.js';
import { DEVICE_PARAMS } from '../../constants/constForApi.js';
import { DURATION_SHORT_MOVIE } from '../../constants/config.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState('');
  const [isChekToken, setIsChekToken] = useState(false);
  const [bedInternet, setBedInternet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isSize = useResize();
  const [isGoodRes, setIsGoodRes] = useState(false);
  const [isLoadingInfoUser, setIsLoadingInfoUser] = useState(false);
  const [parametrsForView, setParametrsForView] = useState(
    DEVICE_PARAMS.desktop
  );
  const [cards, setCards] = useState([]);
  const [cardsForSaveMovie, setCardsForSaveMovie] = useState([]);
  const [bedInternetMy, setBedInternetMy] = useState(false);
  const [endCollection, setEndCollection] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formValid, setFormValid] = React.useState(false);
  const [additionalMovies, setAdditionalMovies] = useState(0);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [isSearchSaveMovies, setIsSearchSaveMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isShortFilms, setIsShortFilms] = useState(
    localStorage.getItem('shortFilmStatusSwitch') === null
      ? false
      : JSON.parse(localStorage.getItem('shortFilmStatusSwitch'))
  );
  const [isShortSaveFilms, setIsShortSaveFilms] = useState(
    localStorage.getItem('shortSaveFilmStatusSwitch') === null
      ? false
      : JSON.parse(localStorage.getItem('shortSaveFilmStatusSwitch'))
  );
  const [currentUser, setCurrentUser] = React.useState(
    localStorage.getItem('user') === null ||
      localStorage.getItem('user') === undefined
      ? {}
      : JSON.parse(localStorage.getItem('user'))
  );
  const [isFormBlock, setIsFormBlock] = useState(false);

  //проверка токена
  function chekToken(jwt) {
    setIsLoading(true);
    chekTokenUser(jwt)
      .then((res) => {
        setLoggedIn(true);
        setIsChekToken(true);
      })
      .catch((err) => {
        console.log('ошибка проверки токена', err);
        setIsChekToken(true);
        logout();
      })
      .finally(() => setIsLoading(false));
  }

  //обработчик кнопки логин
  function handleSubmitLogin({ email, password }) {
    return authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.message);
        setLoggedIn(true);
        setRequestError('');
        getUserData();
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        err === 'Error: 401'
          ? setRequestError('Вы ввели неправильный логин или пароль.')
          : setRequestError('При авторизации произошла ошибка');

        console.log(err);
      });
  }
  // обработчик кнопки зарегисторироваться
  function handleSubmitRegister({ name, email, password }) {
    return register(name, email, password)
      .then((res) => {
        handleSubmitLogin({ email, password });
      })
      .catch((err) => {
        err === 'Error: 409'
          ? setRequestError('Пользователь с таким email уже существует.')
          : setRequestError('При регистрации пользователя произошла ошибка.');
        console.log(err);
      });
  }
  //редактировать профиль
  function handleSubmitEditProfile({ name, email }) {
    setRequestError('');
    setIsLoadingInfoUser(true);
    return editProfile(name, email)
      .then((res) => {
        console.log(res.message);
        setIsEdit(false);
        setIsGoodRes(true);
        setRequestError('');
        setCurrentUser({ name, email });
      })
      .catch((err) => {
        console.log(err);
        err === 'Error: 409'
          ? setRequestError('Пользователь с таким email уже существует.')
          : setRequestError('При обновлении профиля произошла ошибка.');
        console.log(err);
      })
      .finally(() => {
        setTimeout(setGoodRes, 1500);
        setIsLoadingInfoUser(false);
        setFormValid(false);
      });
  }

  function setGoodRes() {
    setIsGoodRes(false);
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      chekToken(localStorage.jwt);
    } else {
      setIsLoading(false);
    }
  }, []);

  //
  function getData(searchWord) {
    setIsLoading(true);
    getCards()
      .then((res) => {
        setBedInternet(false);
        localStorage.setItem('cards', JSON.stringify(getLikesForGetCards(res)));
      })
      .catch((err) => {
        console.log(err);
        setBedInternet(true);
      })
      .finally(() => {
        handlerSearch(searchWord);
        setIsLoading(false);
      });
  }

  function getLikesForGetCards(res) {
    const saveMovie = JSON.parse(localStorage.getItem('saveMovies'));
    if (localStorage.saveMovies === undefined) {
      return res.map((item) => {
        const image = item.image.url;
        const thumbnail = item.image.previewUrl;
        delete item.image;
        item.thumbnail = thumbnail;
        item.image = 'https://api.nomoreparties.co' + image;
        item.like = false;
        return item;
      });
    } else {
      return res.map((item) => {
        const image = item.image.url;
        const thumbnail = item.image.previewUrl;
        // delete item.image;
        item.image = 'https://api.nomoreparties.co/' + image;
        item.thumbnail = thumbnail;
        if (saveMovie.some((movie) => item.id === movie.movieId)) {
          item.like = true;
        } else {
          item.like = false;
        }
        return item;
      });
    }
  }

  const handleMore = () => {
    setAdditionalMovies(additionalMovies + parametrsForView.cards.more);
  };

  function handlerSearchRequest(searchWord) {
    setAdditionalMovies(0);
    if (isFirstSearch) {
      getData(searchWord);
    } else {
      handlerSearch(searchWord);
    }
  }

  function handlerSearch(searchWord) {
    setIsFirstSearch(false);
    setIsNotFound(false);
    localStorage.setItem('searchWord', JSON.stringify(searchWord));
    const foundMovies = JSON.parse(localStorage.getItem('cards')).filter(
      (movie) => {
        return (
          movie.nameRU.toLowerCase().includes(searchWord.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchWord.toLowerCase())
        );
      }
    );
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    if (foundMovies.length === 0) {
      setIsNotFound(true);
    } else if (isShortFilms) {
      JSON.parse(localStorage.getItem('foundMovies')).filter(
        (film) => film.duration <= DURATION_SHORT_MOVIE
      ) === undefined
        ? setIsNotFound(true)
        : makeCollectionCards(
            JSON.parse(localStorage.getItem('foundMovies')).filter(
              (film) => film.duration <= DURATION_SHORT_MOVIE
            ),
            parametrsForView
          );
    } else {
      makeCollectionCards(
        JSON.parse(localStorage.getItem('foundMovies')),
        parametrsForView
      );
    }
    setTimeout(setIsFormBlock, 1000, false);
  }

  //сделать коллекцию кард для рендера
  function makeCollectionCards(cardsForCollection) {
    console.log(cardsForCollection, 'cardsForCollection is app');
    if (cardsForCollection.length === 0) {
      console.log(isNotFound, 'isNotFound is app');
      return setIsNotFound(true);
    }
    const arrCards = [];
    setEndCollection(false);
    for (let i = 0; i < parametrsForView.cards.total + additionalMovies; i++) {
      if (!cardsForCollection[i]) {
        setEndCollection(true);
        break;
      }
      if (
        parametrsForView.cards.total + additionalMovies ===
        cardsForCollection.length
      ) {
        setEndCollection(true);
      }
      arrCards[i] = cardsForCollection[i];
    }
    setCards(arrCards);
  }

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/', { replace: true });
  };

  function getUserData() {
    Promise.all([getUserInfo(), getSavedMovies()])
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res[0].message));
        setCurrentUser(res[0].message);
        if (res[1].message.length > 0) {
          localStorage.setItem('saveMovies', JSON.stringify(res[1].message));
          setCardsForSaveMovie(
            localStorage.setItem('saveMovies', JSON.stringify(res[1].message))
          );
        } else {
          localStorage.setItem('saveMovies', JSON.stringify([]));
          setCardsForSaveMovie([]);
        }
      })
      .catch((err) => {
        setBedInternetMy(true);
        console.log(err);
      });
  }

  useEffect(() => {
    if (isSize > DEVICE_PARAMS.desktop.width) {
      setParametrsForView(DEVICE_PARAMS.desktop);
    } else if (isSize > DEVICE_PARAMS.tablet.width) {
      setParametrsForView(DEVICE_PARAMS.tablet);
    } else {
      setParametrsForView(DEVICE_PARAMS.mobile);
    }
  }, [isSize]);

  useEffect(() => {
    setAdditionalMovies(0);
    makeCollectionCards(JSON.parse(localStorage.getItem('cards')));
  }, [parametrsForView]);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<UserPage isLoggedIn={loggedIn} />} />
            <Route
              path="/signin"
              element={
                <Login
                  isLoggedIn={loggedIn}
                  onSubmit={handleSubmitLogin}
                  requestError={requestError}
                  setRequestError={setRequestError}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  isLoggedIn={loggedIn}
                  onSubmit={handleSubmitRegister}
                  requestError={requestError}
                  setRequestError={setRequestError}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  isLoggedIn={loggedIn}
                  parametrsForView={parametrsForView}
                  path="/movies"
                  isChekToken={isChekToken}
                  bedInternet={bedInternet}
                  isLoading={isLoading}
                  makeCollectionCards={makeCollectionCards}
                  cards={cards}
                  handleMore={handleMore}
                  setIsNotFound={setIsNotFound}
                  handlerSearchRequest={handlerSearchRequest}
                  isFirstSearch={isFirstSearch}
                  setIsFirstSearch={setIsFirstSearch}
                  isShortFilms={isShortFilms}
                  setIsShortFilms={setIsShortFilms}
                  endCollection={endCollection}
                  isNotFound={isNotFound}
                  additionalMovies={additionalMovies}
                  isSize={isSize}
                  setAdditionalMovies={setAdditionalMovies}
                  setCards={setCards}
                  isFormBlock={isFormBlock}
                  setIsFormBlock={setIsFormBlock}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SaveMovies}
                  isLoggedIn={loggedIn}
                  parametrsForView={parametrsForView}
                  path="/saved-movies"
                  isChekToken={isChekToken}
                  bedInternet={bedInternetMy}
                  isLoading={isLoading}
                  makeCollectionCards={makeCollectionCards}
                  isSize={isSize}
                  setIsShortSaveFilms={setIsShortSaveFilms}
                  isShortSaveFilms={isShortSaveFilms}
                  handlerSearchRequest={handlerSearchRequest}
                  endCollection={endCollection}
                  isNotFound={isNotFound}
                  isSearchSaveMovies={isSearchSaveMovies}
                  setIsSearchSaveMovies={setIsSearchSaveMovies}
                  cardsForSaveMovie={cardsForSaveMovie}
                  setCardsForSaveMovie={setCardsForSaveMovie}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  path="/profile"
                  onSubmit={handleSubmitEditProfile}
                  requestError={requestError}
                  setRequestError={setRequestError}
                  isLoading={isLoading}
                  isLoadingInfoUser={isLoadingInfoUser}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  formValid={formValid}
                  setFormValid={setFormValid}
                  handleExit={logout}
                  isGoodRes={isGoodRes}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
