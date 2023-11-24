import React from 'react';
import './Movies.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';

// import movieImage from '../../images/card.png';

// const movies = [
//   { _id: 1, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: true },
//   { _id: 2, image: movieImage, name: '34 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 3, image: movieImage, name: '35 слов о дизайне', time: '1ч 42м', saved: false },
//   { _id: 4, image: movieImage, name: '36 слов о дизайне', time: '1ч 42м', saved: false },
//   { _id: 5, image: movieImage, name: '37 слов о дизайне', time: '1ч 42м', saved: false },
//   { _id: 6, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 7, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 8, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 9, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 10, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 11, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 12, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 13, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 14, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 15, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
//   { _id: 16, image: movieImage, name: '33 слова о дизайне', time: '1ч 42м', saved: false },
// ];

function Movies({ onSearchMovies, movies, isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} theme="black" />
      <section className="movies">
        <SearchForm onSearchMovies={onSearchMovies} />
        <MoviesCardList cards={movies} isSavedFilms={false} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
