import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import account from '../../images/ico_account.svg';
import menu from '../../images/menu-button.svg';

function Header({ isLoggedIn, theme }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleOpen() {
    setIsClicked(true);
    console.log('isClicked =', isClicked);
  }

  function handleClose() {
    setIsClicked(false);
  }

  return (
    <>
      {!isLoggedIn ? (
        <header
          className={
            theme
              ? `header header_onAuth header_${theme}`
              : 'header header_onAuth'
          }
        >
          <Link to="/" className="header__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <div className="header__button-container header__button-container_noAuth">
            <Link to="/signup" className="header__button header__button_noAuth">
              Регистрация
            </Link>
            <Link
              to="/signin"
              className="header__button header__button_noAuth header__button_green"
            >
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className={theme ? `header header_${theme}` : 'header'}>
          <Link to="/" className="header__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <nav className="header__links-films">
            <ul className="header__menu-films-links">
              <li>
                <Link to="/movies" className="header__button">
                  Фильмы
                </Link>
              </li>
              <li>
                <Link to="/saved-movies" className="header__button">
                  Сохранённые фильмы
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <p className="header__accoutn-title">Аккаунт</p>
              <div
                className={
                  theme
                    ? `header__ico-account-button header__ico-account-button_${theme}`
                    : 'header__ico-account-button'
                }
              >
                <img
                  src={account}
                  alt="аккаунт"
                  className="header__img-account-button"
                />
              </div>
            </Link>
            <button
              onClick={handleOpen}
              className={
                theme
                  ? `header__menu-button header__menu-button_${theme}`
                  : 'header__menu-button'
              }
            >
              <img src={menu} alt="меню" />
            </button>
          </div>
          {isClicked ? <Navigation handleClose={handleClose} /> : ''}
        </header>
      )}
    </>
  );
}

export default Header;
