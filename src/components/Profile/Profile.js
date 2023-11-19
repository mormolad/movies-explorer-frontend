import React from 'react';
import Header from '../Header/Header.jsx';
import './Profile.css';

function Profile() {
  return (
    <>
      <Header theme="black" isLoggedIn={true} />
      <section className="profile">
        <h3 className="profile__title">Привет, Виталий!</h3>
        <form className="profile__form">
          <label className="profile__field profile__field_border">
            Имя
            <input
              name="name"
              className="profile__input"
              type="text"
              minLength="2"
              maxLength="40"
              value="Виталий"
              required
            />
          </label>
          <label className="profile__field">
            E-mail
            <input
              name="email"
              className="profile__input"
              type="text"
              value="paspean@mail.ru"
              required
            />
          </label>
          <button type="submit" className="profile__button-save">
            Редактировать
          </button>
          <button className="profile__logout">Выйти из аккаунта</button>
        </form>
      </section>
    </>
  );
}

export default Profile;
