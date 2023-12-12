import React from 'react';
import './Form.css';

function Form({ fields, buttonText, onSubmit, isValid }) {
  let valuesForm = {};
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
              required
            />
            <span className="form__input-error">
              {item.inputError ? item.inputError : ''}
            </span>
          </label>
        ))}
        {/* {<span className="form__input-error">
              {item.inputError ? item.inputError : ''}
            </span>}        */}
        <button
          type="submit"
          className={`form__button-save ${
            isValid ? '' : 'form__button-save_inactive'
          }`}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
    </>
  );
}

export default Form;
