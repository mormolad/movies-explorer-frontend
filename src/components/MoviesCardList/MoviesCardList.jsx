import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  cards,
  handleMore,
  endCollection,
  setCards,
  setIsNotFound,
  isSearchSaveMovies,
}) {
  const onClick = (e) => {
    handleMore();
  };
  return (
    <section className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard
            card={card}
            key={card.id}
            setCards={setCards}
            setIsNotFound={setIsNotFound}
            isSearchSaveMovies={isSearchSaveMovies}
          />
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
