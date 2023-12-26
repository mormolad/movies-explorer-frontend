import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ cards, isLoading, hanleMore, endCollection }) {
  const onClick = (e) => {
    hanleMore();
  };
  console.log(cards);
  return (
    <section className="cards">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <ul className="cards__list">
            {cards.map((card) => (
              <MoviesCard key={card._id} card={card} />
            ))}
          </ul>
          <div className="cards__button-container">
            {!endCollection ? (
              <button className="cards__button" onClick={onClick}>
                Ещё
              </button>
            ) : (
              ''
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
