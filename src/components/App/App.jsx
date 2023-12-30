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
} from '../../utils/myAPIMovies.js';
import getCards from '../../utils/MoviesApi';
import { useResize } from '../../hooks/useResize.js';
import { DEVICE_PARAMS } from '../../constants/constForApi.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState('');
  const [isChekToken, setIsChekToken] = useState(false);
  const [bedInternet, setBedInternet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isSize = useResize();
  const [parametrsForView, setParametrsForView] = useState(
    DEVICE_PARAMS.desktop
  );
  const [bedInternetMy, setBedInternetMy] = useState(false);
  //проверка токена
  function chekToken(jwt) {
    chekTokenUser(jwt)
      .then((res) => {
        setLoggedIn(true);
        setIsChekToken(true);
      })
      .catch((err) => {
        console.log('ошибка проверки токена', err);
        setLoggedIn(false);
        setIsChekToken(true);
      });
  }

  //обработчик кнопки логин
  function handleSubmitLogin({ email, password }) {
    return authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.message);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        setRequestError(err);
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
        setRequestError(err);
        console.log(err);
      });
  }

  function handleSubmitEditProfile({ name, email }) {
    return editProfile(name, email).then((res) => {
      localStorage.setItem('user', res.message);
    });
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      chekToken(localStorage.jwt);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getUserInfo().then((res) => {
        localStorage.setItem('user', JSON.stringify(res.message));
      });
    }
  }, [loggedIn]);

  function getData() {
    setIsLoading(true);
    getCards()
      .then((res) => {
        setBedInternet(false);
        setIsLoading(false);
        localStorage.setItem('cards', JSON.stringify(res));
        localStorage.setItem(
          'cardsShortFilms',
          JSON.stringify(res.filter((film) => film.duration <= 40))
        );
      })
      .catch((err) => {
        console.log(err);
        setBedInternet(true); //написать ошибку нет соединения с сервером фильмов
      });
    getSavedMovies()
      .then((res) => {
        if (res.length === 0) {
          return;
        }
        if (res.message.length > 0) {
          localStorage.setItem('saveMovies', JSON.stringify(res.message));
          localStorage.setItem(
            'saveMovieShort',
            JSON.stringify(res.message.filter((film) => film.duration <= 40))
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setBedInternetMy(true);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      getData();
    }
  }, [loggedIn]);

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
    <div className="page">
      <div className="page__content">
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
              />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
