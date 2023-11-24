import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserPage from '../UserPage/UserPage.jsx';
//import Register from '../Register/Register.jsx';
import NoAuthPage from '../NoAuthPage/NoAuthPage.jsx';
import Movies from '../Movies/Movies.jsx';
// import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import * as movies from '../../utils/MoviesApi';

function App() {
  const isLoggedIn = true;
  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (isLoggedIn) {
      movies
        .getCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={<UserPage isLoggedIn={isLoggedIn} />} />
          <Route
            path="/signin"
            element={
              <NoAuthPage
                title="Рады видеть!"
                form={{
                  fields: [
                    {
                      title: 'E-mail',
                      type: 'email',
                      name: 'login',
                      id: 'signin-field-login',
                    },
                    {
                      title: 'Пароль',
                      type: 'password',
                      name: 'pass',
                      id: 'signin-field-pass',
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
            element={<Movies movies={cards} isLoggedIn={isLoggedIn} />}
          />
          {/*
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>  */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
