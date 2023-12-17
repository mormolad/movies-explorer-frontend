import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ cards, isLoading }) {
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
            <button className="cards__button">Ещё</button>
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
