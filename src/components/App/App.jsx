import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer';
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile';
// import NotFound from '../NotFound/NotFound';
import * as movies from '../../utils/MoviesApi';

function App() {
  const [cards, setCards] = useState([]);

  const isLoggedIn = true;

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
        <Switch>
          <Route exact path="/">
            <Header isLoggedIn={isLoggedIn} />
            <Main />
             <Footer /> 
          </Route>
          {/* <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/movies">
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
