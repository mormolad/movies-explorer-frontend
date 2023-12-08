import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <section className="promo" id="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <h3 className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </h3>
        <button className="promo__button">Узнать больше</button>
        <div className="promo__landing-logo"></div>
      </div>
    </section>
  );
}

export default Promo;
