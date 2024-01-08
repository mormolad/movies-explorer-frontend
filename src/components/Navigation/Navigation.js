import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import account from '../../images/profile.svg';

function Navigation({ handleClose }) {
  return (
    <div className="navigation__overlay">
      <div onClick={handleClose} className="navigation__container-empty">
        {' '}
      </div>{' '}
      <div className="navigation__container">
        <button
          className="navigation__close-button"
          onClick={handleClose}
        ></button>{' '}
        <nav className="navigation__nav">
          <ul className="navigation__menu-links">
            <li>
              <NavLink
                to="/"
                onClick={handleClose}
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link navigation__link_active'
                    : 'navigation__link'
                }
              >
                Главная{' '}
              </NavLink>{' '}
            </li>{' '}
            <li>
              <NavLink
                to="/movies"
                onClick={handleClose}
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link navigation__link_active'
                    : 'navigation__link'
                }
              >
                Фильмы{' '}
              </NavLink>{' '}
            </li>{' '}
            <li>
              <NavLink
                to="/saved-movies"
                onClick={handleClose}
                className={({ isActive }) =>
                  isActive
                    ? 'navigation__link navigation__link_active'
                    : 'navigation__link'
                }
              >
                Сохранённые фильмы{' '}
              </NavLink>{' '}
            </li>{' '}
          </ul>{' '}
        </nav>{' '}
        <NavLink
          to="/profile"
          onClick={handleClose}
          className={({ isActive }) =>
            isActive
              ? 'navigation__link navigation__link_active'
              : 'navigation__link'
          }
        >
          <img src={account} alt="аккаунт" />
        </NavLink>{' '}
      </div>{' '}
    </div>
  );
}

export default Navigation;
