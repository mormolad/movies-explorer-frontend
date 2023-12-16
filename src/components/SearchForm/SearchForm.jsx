import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';
import ErrorSearch from '../ErrorSearch/ErrorSearch';

function SearchForm({ onSearch }) {
  const [value, setValue] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  //обработка поля поискового запроса
  function handleChangValue(e) {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      setInputError('onSearch');
      return;
    }
    setInputError('');
    onSearch(value);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
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
        <button className="search__button" type="submit">
          Поиск
        </button>
        {inputError ? (
          <ErrorSearch
            className="search__message-error"
            text="Нужно ввести ключевое слово"
          />
        ) : (
          ''
        )}
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
