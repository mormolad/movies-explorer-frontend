import React from 'react';
import '../NoAuthPage/NoAuthPage.css';
import Form from '../Form/Form.jsx';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function NoAuthPage({ title, form, link, question, linkText }) {
  return (
    <div className="no-auth-page">
      <Link to="/" className="no-auth-page__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h1 className="no-auth-page__title">{title}</h1>
      <Form fields={form.fields} buttonText={form.buttonText} />
      <p className="no-auth-page__text">
        {question}
        <Link to={link} className="no-auth-page__link">
          {linkText}
        </Link>
      </p>
    </div>
  );
}

export default NoAuthPage;
