import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage.jsx';
import NoAuthPage from '../NoAuthPage/NoAuthPage.jsx';
import Movies from '../Movies/Movies.jsx';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import getCards from '../../utils/MoviesApi';
import { chekTokenUser, register, authorize } from '../../utils/auth.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = useState([]);
  const [emailUser, setEmailUser] = React.useState('');
  const navigate = useNavigate();

  //проверка токена
  function chekToken(jwt) {
    chekTokenUser(jwt)
      .then((res) => {
        setEmailUser(res.message.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log('ошибка проверки токена', err);
        setLoggedIn(false);
      });
  }

  function handleSubmitLogin({ email, password }) {
    authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.message);
        setEmailUser(email);
        setLoggedIn(true);
      })
      .catch(console.error);
  }

  function handleSubmitRegister({ email, password, name }) {
    register(email, password, name)
      .then((data) => {
        setEmailUser(email);
        setLoggedIn(true);
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (loggedIn) {
      getCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies', { replace: true });
    } else {
      navigate('/signin', { replace: true });
    }
  }, [loggedIn]);

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
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
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
                loggedIn={loggedIn}
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
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login isLoggedIn={loggedIn} onSubmit={handleSubmitLogin} />
            }
          />
          <Route
            path="/signup"
            element={
              <NoAuthPage
                onSubmit={handleSubmitRegister}
                title="Добро пожаловать!"
                form={{
                  fields: [
                    {
                      title: 'Имя',
                      type: 'text',
                      name: 'name',
                      id: 'signup-field-neme',
                    },
                    {
                      title: 'E-mail',
                      type: 'email',
                      name: 'email',
                      id: 'signup-field-login',
                    },
                    {
                      title: 'Пароль',
                      type: 'password',
                      name: 'pass',
                      id: 'signup-field-pass',
                    },
                  ],
                  buttonText: 'Зарегистрироваться',
                }}
                question="Уже зарегистрированы? "
                linkText="Войти"
                link="/signin"
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
