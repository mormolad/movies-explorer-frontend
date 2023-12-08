import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import account from '../../images/profile.svg';

function Navigation({ handleClose }) {
  return (
    <div className="navigation__overlay">
      <div onClick={handleClose} className="navigation__container-empty"></div>
      <div className="navigation__container">
        <button
          className="navigation__close-button"
          onClick={handleClose}
        ></button>
        <nav className="navigation__nav">
          <ul className="navigation__menu-links">
            <li>
              <Link to="/" onClick={handleClose} className="navigation__link">
                Главная
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                onClick={handleClose}
                className="navigation__link"
              >
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                to="/saved-movies"
                onClick={handleClose}
                className="navigation__link"
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          to="/profile"
          onClick={handleClose}
          className="navigation__account-button"
        >
          <img src={account} alt="аккаунт" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
