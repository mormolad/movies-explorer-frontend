import React from 'react';
import photo from '../../images/myphoto.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__content">
          <h3 className="about-me__large-title">Антон</h3>
          <p className="about-me__info">Фронтенд-разработчик, 42 года</p>
          <p className="about-me__description">
            Живу в пригороде Красноярска, закончил СибГАУ, по специальности
            инженер-электронщик. Люблю готовить и путешествовать. Благодаря
            курсу Веб-разработчик в Яндекс Практикуме, превращаю хобби в
            профессию. В последствии хочу организовать собственный стартап.
          </p>
          <a
            href="https://github.com/mormolad"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={photo} alt="фото" className="about-me__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
