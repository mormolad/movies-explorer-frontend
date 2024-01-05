import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';
import ErrorSearch from '../ErrorSearch/ErrorSearch';

function SearchForm({ onSearch, setIsShortFilms, searchWord }) {
  const [value, setValue] = React.useState(searchWord);
  const [inputError, setInputError] = React.useState(false);

  //обработка поля поискового запроса
  function handleChangValue(e) {
    setValue(e.target.value);
    !e.target.value
      ? setInputError('поле не может быть пустым')
      : setInputError('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      setInputError('поле не может быть пустым');
      return;
    }
    setInputError('');
    onSearch(value);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <label className="search__label" htmlFor="search-input"></label>
        <input
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильмы"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangValue}
          value={value ?? searchWord} // что бы компонент сразу был управляемым
        ></input>
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
      {inputError ? (
        <ErrorSearch
          className="search__input-error"
          text="Нужно ввести ключевое слово"
        />
      ) : (
        ''
      )}
      <FilterCheckbox setIsShortFilms={setIsShortFilms} />
    </section>
  );
}

export default SearchForm;
