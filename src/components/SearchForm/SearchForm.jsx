import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';

function SearchForm() {
  const [value, setValue] = React.useState('');
  //обработка поля имени
  function handleChangValue(e) {
    setValue(e.target.value);
  }
  return (
    <section className="search">
      <form className="search__form">
        <label className="search__label" htmlFor="search-input"></label>
        <input
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangValue}
          value={value ?? 'Фильмы'} // что бы компонент сразу был управляемым
        ></input>
        {/* <span className="search__message-error"></span> */}
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
