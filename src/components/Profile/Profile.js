import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.jsx';
import Form from '../Form/Form.jsx';
import { EMAIL_REGEXP } from '../../constants/regexp';
import './Profile.css';
import InfoUser from '../InfoUser/InfoUser.jsx';
import Preloader from '../Preloader/Preloader.jsx';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({
  formValid,
  setFormValid,
  isEdit,
  setIsEdit,
  onSubmit,
  requestError,
  isLoadingInfoUser,
  handleExit,
  isGoodRes,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(() => {
    console.log(currentUser.name);
    return currentUser.name;
  });
  console.log(currentUser);
  const [nameDitry, setNameDitry] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [email, setEmail] = React.useState(currentUser.email);
  const [emailDitry, setEmailDitry] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');

  const [nameNotChanged, setNameNotChanged] = useState(true);
  const [emailNotChanged, setEmailNotChanged] = useState(true);

  useEffect(() => {
    emailError || nameError || (nameNotChanged && emailNotChanged)
      ? setFormValid(false)
      : setFormValid(true);
  }, [emailError, nameError, nameNotChanged, emailNotChanged]);

  function handleChangeName(e) {
    if (e.target.value === currentUser.name) {
      setNameNotChanged(true);
    } else {
      setNameNotChanged(false);
    }
    setName(e.target.value);
    !e.target.value
      ? setNameError('поле не может быть пустым')
      : setNameError('');
  }

  function handleChangeEmail(e) {
    if (e.target.value === currentUser.email) {
      setEmailNotChanged(true);
    } else {
      setEmailNotChanged(false);
    }
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

  const handleSubmit = (valuesForm) => {
    console.log(valuesForm);
    onSubmit(valuesForm);
  };

  return (
    <>
      <Header theme="black" isLoggedIn={true} />{' '}
      <section className="profile">
        <h3 className="profile__title"> Привет, {currentUser.name}! </h3>{' '}
        {isLoadingInfoUser ? (
          <Preloader />
        ) : isEdit ? (
          <Form
            fields={[
              {
                title: 'Имя',
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
                title: 'E-mail',
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
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
            isValid={formValid}
            requestError={requestError}
            modifierCSS={'profile'}
          />
        ) : (
          <>
            {' '}
            {isGoodRes ? (
              <p className="profile__good-res">
                Сохранение данных прошло успешно{' '}
              </p>
            ) : (
              <InfoUser
                name={name}
                email={email}
                buttonText="Редактировать"
                onSubmit={setIsEdit}
              />
            )}{' '}
            <button className="profile__logout" onClick={handleExit}>
              Выйти из аккаунта{' '}
            </button>{' '}
          </>
        )}{' '}
      </section>{' '}
    </>
  );
}

export default Profile;
