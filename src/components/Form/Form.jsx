import React from 'react';
import './Form.css';

function Form({ fields, buttonText, onSubmit, isValid }) {
  console.log(onSubmit);
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
              onBlur={item.onBlur}
              required
            />
            <span className="form__input-error">
              {item.inputDitry && item.inputError ? item.inputError : ''}
            </span>
          </label>
        ))}
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
