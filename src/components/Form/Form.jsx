import React from 'react';
import './Form.css';

function Form({ fields, buttonText }) {
  return (
    <>
      <form className="form">
        {fields.map((item, i, arr) => (
          <label className="form__field" key={item.name}>
            {item.title}
            <input
              name={item.name}
              className="form__input"
              id={item.id}
              type={item.type}
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
