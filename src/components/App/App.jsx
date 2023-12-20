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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState('');
  const [isChekToken, setIsChekToken] = useState(false);
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
      .then(() => {
        handleSubmitLogin({ email, password });
      })
      .catch((err) => {
        setRequestError(err);
        console.log(err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      chekToken(localStorage.jwt);
      console.log(localStorage.getItem('jwt'));
    }
  }, []);

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
                path="/movies"
                isChekToken={isChekToken}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={loggedIn}
                path="/saved-movies"
                isChekToken={isChekToken}
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
                isChekToken={isChekToken}
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
