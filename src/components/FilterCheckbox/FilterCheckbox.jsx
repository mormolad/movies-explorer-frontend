import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ setIsShortFilms }) {
  const [durationCheckbox, setDurationCheckbox] = useState(false);

  function handleChangValue(e) {
    setDurationCheckbox(e.target.checked);
    setIsShortFilms(e.target.checked);
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
