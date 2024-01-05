import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ setIsShortFilms }) {
  const [durationCheckbox, setDurationCheckbox] = useState(
    JSON.parse(localStorage.getItem('shortFilmStatusSwitch'))
  );

  function handleChangValue(e) {
    console.log(e.target.checked);
    setDurationCheckbox(e.target.checked);
    setIsShortFilms(e.target.checked);
    localStorage.setItem(
      'shortFilmStatusSwitch',
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
