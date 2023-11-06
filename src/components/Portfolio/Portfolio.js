import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__list">
        <a
          href="https://mormolad.github.io/how-to-learn/"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer">
          <p className="portfolio__text-link">Статичный сайт</p>
          <img className="portfolio__image" src={arrow} alt="стрелка" />
        </a>
        <a
          href="https://mormolad.github.io/russian-travel/"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer">
          <p className="portfolio__text-link">Адаптивный сайт</p>
          <img className="portfolio__image" src={arrow} alt="стрелка" />
        </a>
        <a
          href="https://mormolad.github.io/react-mesto-auth/"
          className="portfolio__link portfolio__link-no-border"
          target="_blank"
          rel="noreferrer">
          <p className="portfolio__text-link">Одностраничное приложение</p>
          <img className="portfolio__image" src={arrow} alt="стрелка" />
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
