import React from 'react';
import './Form.css';
import { useLocation } from 'react-router';
function Form({ fields, buttonText, onSubmit, isValid, requestError }) {
  let valuesForm = {};
  const location = useLocation();
  fields.map((item) => (valuesForm[item.type] = item.valueInput));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(valuesForm);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {fields.map((item, i, arr) => (
          <label className="form__field" key={item.name}>
            {item.title}
            <input
              name={item.name}
              className="form__input"
              id={item.id}
              type={item.type}
              onChange={item.onChange}
              value={item.valueInput}
              required
            />
            <span className="form__input-error">
              {item.inputError ? item.inputError : ''}
            </span>
          </label>
        ))}
        <div className="form__conteiner-button">
          <span className="form__request-error">
            {requestError.length > 0 ? requestError : ''}
          </span>
          <button
            type="submit"
            className={`form__button-save ${
              isValid ? '' : 'form__button-save_inactive'
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
