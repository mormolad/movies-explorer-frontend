import React from 'react';
import './Movies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import { useState } from 'react';
import getCards from '../../utils/MoviesApi';
import { useEffect } from 'react';
function Movies({ onSearch, isLoggedIn }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShortFilms, setIsShortFilms] = useState(false);
  const hanleCards = () => {
    getCards().then((res) => {
      setCards(res);
    });
  };

  hanleCards();

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem('cards', JSON.stringify(cards));
      localStorage.setItem(
        'cardsShortFilms',
        JSON.stringify(cards.filter((film) => film.duration <= 40))
      );
    }
    setIsLoading(false);
    console.log(cards);
  }, [cards]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
        <SearchForm onSearch={onSearch} setIsShortFilms={setIsShortFilms} />
        <MoviesCardList
          cards={
            isShortFilms
              ? JSON.parse(localStorage.getItem('cardsShortFilms'))
              : JSON.parse(localStorage.getItem('cards'))
          }
          isLoading={isLoading}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
