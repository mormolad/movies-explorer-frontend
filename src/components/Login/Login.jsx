import React from 'react';
import '../Form/Form.css';
import Form from '../Form/Form.jsx';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function NoAuthPage({ title, form }) {
  const link = '/signup';
  return (
    <div className="login-page">
      <Link to="/" className="form__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h1 className="title">{title}</h1>
      <Form fields={form.fields} buttonText={form.buttonTex} />
      <p className="form__text">
        "Еще не зарегистрированы?"
        <Link to={link} className="form__link">
          " Регистрация"
        </Link>
      </p>
    </div>
  );
}

export default NoAuthPage;
