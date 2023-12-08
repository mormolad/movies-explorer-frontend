import React from 'react';
import './Form.css';

function Form({ fields, buttonText, onSubmit }) {
  console.log(typeof fields[0].onChange);
  let valuesForm = {};
  fields.map((item, i, arr) => (valuesForm[item.type] = item.valueInput));

  function handleSubmit(e) {
    console.log(valuesForm);
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
            <span className="form__input-error">Что-то пошло не так...</span>
          </label>
        ))}
        <button type="submit" className="form__button-save">
          {buttonText}
        </button>
      </form>
    </>
  );
}

export default Form;
