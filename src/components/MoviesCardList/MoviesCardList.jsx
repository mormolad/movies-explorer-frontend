import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, handleMore, endCollection }) {
  const onClick = (e) => {
    handleMore();
  };

  return (
    <section className="cards">
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
    </section>
  );
}

export default MoviesCardList;
