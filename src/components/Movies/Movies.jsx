import React from 'react';
import './Movies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';

function Movies({ onSearchMovies, movies, isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
        <SearchForm onSearch={onSearchMovies} />
        <MoviesCardList cards={movies} isSavedFilms={false} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
