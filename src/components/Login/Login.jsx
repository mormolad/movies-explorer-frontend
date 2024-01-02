import React, { useEffect } from 'react';
import './Login.css';
import Form from '../Form/Form.jsx';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { EMAIL_REGEXP } from '../../constants/regexp';

function Login({ onSubmit, isLoggedIn, requestError, setRequestError }) {
  const navigate = useNavigate();
  const link = '/signup';
  //стайт переменный для страницы логин
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailDitry, setEmailDitry] = React.useState(false);
  const [passwordDitry, setPasswordDitry] = React.useState(false);
  const [emailError, setEmailError] = React.useState(
    'Поле не может быть пустым'
  );
  const [passwordError, setPasswordError] = React.useState(
    'Поле не может быть пустым'
  );
  const [formValid, setFormValid] = React.useState(false);

  useEffect(() => {
    emailError || passwordError ? setFormValid(false) : setFormValid(true);
  }, [emailError, passwordError]);

  //обработка поля email
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setEmailDitry(true);
    !e.target.value
      ? setEmailError('поле не может быть пустым')
      : !EMAIL_REGEXP.test(String(e.target.value).toLowerCase())
      ? setEmailError('не корректный емаил')
      : setEmailError('');
  }
  // обработака поля pass
  function handleChangePassword(e) {
    setPasswordDitry(true);
    setPassword(e.target.value);
    !e.target.value
      ? setPasswordError('поле не может быть пустым')
      : e.target.value.length < 2
      ? setPasswordError('короткий пароль')
      : setPasswordError('');
  }

  useEffect(() => {
    setRequestError('');
  }, []);

  return isLoggedIn ? (
    navigate('/movies', { replace: true })
  ) : (
    <div className="login">
      <Link to="/" className="login__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h1 className="login__title">"Рады видеть!"</h1>
      <Form
        fields={[
          {
            title: 'E-mail',
            type: 'email',
            name: 'email',
            id: 'signin-field-login',
            onChange: handleChangeEmail,
            valueInput: email,
            inputDitry: emailDitry,
            inputError: emailError,
          },
          {
            title: 'Пароль',
            type: 'password',
            name: 'password',
            id: 'signin-field-pass',
            onChange: handleChangePassword,
            valueInput: password,
            inputDitry: passwordDitry,
            inputError: passwordError,
          },
        ]}
        buttonText={'Войти'}
        onSubmit={onSubmit}
        isValid={formValid}
        requestError={requestError}
      />
      <p className="login__text">
        Еще не зарегистрированы?
        <Link to={link} className="login__link">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
