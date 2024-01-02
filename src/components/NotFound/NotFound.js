import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const history = useNavigate();

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link className="not-found__link" onClick={() => history(-1)}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
