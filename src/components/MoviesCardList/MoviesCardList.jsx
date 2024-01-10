import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect } from 'react';

function MoviesCardList({
  cards,
  handleMore,
  endCollection,
  setCards,
  setIsNotFound,
  isSearchSaveMovies,
  isShortFilms,
  makeCollectionCards,
}) {
  const onClick = (e) => {
    handleMore();
  };

  useEffect(() => {
    console.log(cards);
  });

  return (
    <section className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard
            card={card}
            cards={cards}
            setCards={setCards}
            setIsNotFound={setIsNotFound}
            isSearchSaveMovies={isSearchSaveMovies}
            isShortFilms={isShortFilms}
            makeCollectionCards={makeCollectionCards}
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
