import React, { useEffect } from 'react';
import Header from '../Header/Header.jsx';
import Form from '../Form/Form.jsx';
import { EMAIL_REGEXP } from '../../constants/regexp';
import './Profile.css';

function Profile({ onSubmit, requestError }) {
  const [name, setName] = React.useState(
    JSON.parse(localStorage.getItem('user')).name
  );
  const [nameDitry, setNameDitry] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [email, setEmail] = React.useState(
    JSON.parse(localStorage.getItem('user')).email
  );
  const [emailDitry, setEmailDitry] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');

  const [formValid, setFormValid] = React.useState(false);

  useEffect(() => {
    emailError || nameError ? setFormValid(false) : setFormValid(true);
  }, [emailError, nameError]);

  function handleChangeName(e) {
    setName(e.target.value);
    !e.target.value
      ? setNameError('поле не может быть пустым')
      : setNameError('');
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    !e.target.value
      ? setEmailError('поле не может быть пустым')
      : !EMAIL_REGEXP.test(String(e.target.value).toLowerCase())
      ? setEmailError('не корректный емаил')
      : setEmailError('');
  }
  const blurHandlerName = (e) => {
    setNameDitry(true);
  };
  const blurHandlerEmail = (e) => {
    setEmailDitry(true);
  };

  return (
    <>
      <Header theme="black" isLoggedIn={true} />
      <section className="profile">
        <h3 className="profile__title">
          Привет, {JSON.parse(localStorage.getItem('user')).name}!
        </h3>
        <Form
          fields={[
            {
              title: 'name',
              type: 'text',
              name: 'name',
              id: 'profile-field-name',
              onChange: handleChangeName,
              valueInput: name,
              inputDitry: nameDitry,
              onBlur: blurHandlerName,
              inputError: nameError,
            },
            {
              title: 'email',
              type: 'email',
              name: 'email',
              id: 'profiled-field-email',
              onChange: handleChangeEmail,
              valueInput: email,
              inputDitry: emailDitry,
              onBlur: blurHandlerEmail,
              inputError: emailError,
            },
          ]}
          buttonText={'Редактировать'}
          onSubmit={onSubmit}
          isValid={formValid}
          requestError={requestError}
        />
        <button className="profile__logout">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;
