import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage.jsx';
import Movies from '../Movies/Movies.jsx';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import getCards from '../../utils/MoviesApi';
import { chekTokenUser, register, authorize } from '../../utils/auth.js';
import Register from '../Register/Register.jsx';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = useState([]);
  const [emailCurrentUser, setEmailCurrentUser] = React.useState('');
  const navigate = useNavigate();

  //проверка токена
  function chekToken(jwt) {
    chekTokenUser(jwt)
      .then((res) => {
        setLoggedIn(true);
        getCards().then((ress) => {
          setCards(ress);
          localStorage.setItem('cards', JSON.stringify(cards));
        });
      })
      .catch((err) => {
        console.log('ошибка проверки токена', err);
        setLoggedIn(false);
      });
  }

  function handleSubmitLogin({ email, password }) {
    return authorize(email, password)
      .then((data) => {
        console.log(data);
        localStorage.setItem('jwt', data.message);
        setEmailCurrentUser(email);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmitRegister({ name, email, password }) {
    register(name, email, password)
      .then(() => {
        handleSubmitLogin({ email, password });
      })
      .catch((err) => {
        console.log(err.status);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      chekToken(localStorage.jwt);
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
              <Login isLoggedIn={loggedIn} onSubmit={handleSubmitLogin} />
            }
          />
          <Route
            path="/signup"
            element={
              <Register isLoggedIn={loggedIn} onSubmit={handleSubmitRegister} />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                movies={cards}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                movies={cards}
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
