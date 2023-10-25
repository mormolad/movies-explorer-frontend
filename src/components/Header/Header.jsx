import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import account from '../../images/ico_user_button.svg';
import menu from '../../images/menu-button.svg';

function Header(loggedIn) {
  const [isClicked, setIsClicked] = useState(false);

  function handleOpen() {
    setIsClicked(true);
  }

  function handleClose() {
    setIsClicked(false);
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="header__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-black">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header" id="header">
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
              <img src={account} alt="аккаунт" />
            </Link>
            <button onClick={handleOpen} className="header__menu-button">
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
