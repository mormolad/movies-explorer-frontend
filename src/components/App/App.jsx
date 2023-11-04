//import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
//import Register from '../Register/Register.jsx';
import NoAuthPage from '../NoAuthPage/NoAuthPage.jsx';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile';
// import NotFound from '../NotFound/NotFound';
//import * as movies from '../../utils/MoviesApi';

function App() {
  //const [cards, setCards] = useState([]);

  const isLoggedIn = true;

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     movies
  //       .getCards()
  //       .then((cardsData) => {
  //         setCards(cardsData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [isLoggedIn]);

  return (
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route exact path="/">
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path="/signin">
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
          </Route>
          <Route path="/signup">
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
          </Route>
          {/*    <Route path="/movies">
            <Movies movies={cards} />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
