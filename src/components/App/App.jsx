import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage.jsx';
//import Register from '../Register/Register.jsx';
import NoAuthPage from '../NoAuthPage/NoAuthPage.jsx';
import Movies from '../Movies/Movies.jsx';
// import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import * as movies from '../../utils/MoviesApi';
import auth from '../../utils/auth.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = useState([]);
  const [emailUser, setEmailUser] = React.useState('');
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function chekToken(jwt) {
    auth
      .chekTokenUser(jwt)
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
    console.log(email, password);
    auth
      .requestUser({ email, password, endPoint: 'signin' })
      .then((data) => {
        console.log('fsdfsdf');
        localStorage.setItem('jwt', data.message);
        setEmailUser(email);
        setLoggedIn(true);
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (loggedIn) {
      movies
        .getCards()
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
      navigate('/', { replace: true });
    } else {
      navigate('/signin', { replace: true });
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      chekToken(localStorage.jwt);
    }
  }, []);

  //обработка поля email
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  // обработака поля pass
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={<UserPage isLoggedIn={loggedIn} />} />
          <Route
            path="/signin"
            element={
              <NoAuthPage
                onSubmit={handleSubmitLogin}
                title="Рады видеть!"
                form={{
                  fields: [
                    {
                      title: 'E-mail',
                      type: 'email',
                      name: 'login',
                      id: 'signin-field-login',
                      onChange: handleChangeEmail,
                      valueInput: email,
                    },
                    {
                      title: 'Пароль',
                      type: 'password',
                      name: 'pass',
                      id: 'signin-field-pass',
                      onChange: handleChangePassword,
                      valueInput: password,
                    },
                  ],
                  buttonText: 'Войти',
                }}
                question="Ещё не зарегистрированы? "
                linkText="Регистрация"
                link="/signup"
              />
            }
          />
          <Route
            path="/signup"
            element={
              <NoAuthPage
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
