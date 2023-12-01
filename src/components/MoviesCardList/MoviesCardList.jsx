import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ cards, isSavedFilms, isLoadingIn }) {
  return (
    <section className="cards">
      {isLoadingIn ? (
        <Preloader />
      ) : (
        <>
          <ul className="cards__list">
            {cards.map((card) => (
              <MoviesCard
                key={card._id}
                card={card}
                isSavedFilms={isSavedFilms}
              />
            ))}
          </ul>
          {isSavedFilms ? '' : <button className="cards__button">Ещё</button>}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
