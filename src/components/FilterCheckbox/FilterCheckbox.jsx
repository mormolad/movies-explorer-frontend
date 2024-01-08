import React, { useState } from 'react';
import './FilterCheckbox.css';
import { useLocation } from 'react-router';

function FilterCheckbox({ setIsShortFilms }) {
  const location = useLocation();
  const [durationCheckbox, setDurationCheckbox] = useState(() => {
    return location.pathname === '/saved-movies'
      ? false
      : JSON.parse(localStorage.getItem('shortFilmStatusSwitch'));
  });

  function handleChangValue(e) {
    setDurationCheckbox(e.target.checked);
    setIsShortFilms(e.target.checked);
    localStorage.setItem(
      location.pathname === '/saved-movies'
        ? 'shortSaveFilmStatusSwitch'
        : 'shortFilmStatusSwitch',
      JSON.stringify(e.target.checked)
    );
  }

  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleChangValue}
        checked={durationCheckbox}
      ></input>
      <span className="filter__title">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;
