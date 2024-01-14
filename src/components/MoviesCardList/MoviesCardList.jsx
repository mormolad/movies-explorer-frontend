import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect } from 'react';

<<<<<<< HEAD
function MoviesCardList({
  cards,
  handleMore,
  endCollection,
  setCards,
  setIsNotFound,
  isSearchSaveMovies,
  isShortFilms,
  makeCollectionCards,
  setFoundMovies,
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
            cards={cards}
            setCards={setCards}
            setIsNotFound={setIsNotFound}
            isSearchSaveMovies={isSearchSaveMovies}
            isShortFilms={isShortFilms}
            makeCollectionCards={makeCollectionCards}
            setFoundMovies={setFoundMovies}
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
=======
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
>>>>>>> 0d7fd1aad5739a13e831b4132c0af311662b7bb5
    </section>
  );
}

export default MoviesCardList;
