import React, { useEffect } from 'react';
import './Login.css';
import Form from '../Form/Form.jsx';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { EMAIL_REGEXP } from '../../constants/regexp';

function Login({ onSubmit, isLoggedIn }) {
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

  //проверка что поле email не было в фокусе
  const blurHandlerEmail = (e) => {
    setEmailDitry(true);
  };
  //проверка что поле password не было в фокусе
  const blurHandlerPassword = (e) => {
    setPasswordDitry(true);
  };
  //обработка поля email
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    !e.target.value
      ? setEmailError('поле не может быть пустым')
      : !EMAIL_REGEXP.test(String(e.target.value).toLowerCase())
      ? setEmailError('не корректный емаил')
      : setEmailError('');
  }
  // обработака поля pass
  function handleChangePassword(e) {
    setPassword(e.target.value);
    !e.target.value
      ? setPasswordError('поле не может быть пустым')
      : e.target.value.length < 2
      ? setPasswordError('короткий пароль')
      : setPasswordError('');
  }
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
            name: 'login',
            id: 'signin-field-login',
            onChange: handleChangeEmail,
            valueInput: email,
            inputDitry: emailDitry,
            onBlur: blurHandlerEmail,
            inputError: emailError,
          },
          {
            title: 'Пароль',
            type: 'password',
            name: 'pass',
            id: 'signin-field-pass',
            onChange: handleChangePassword,
            valueInput: password,
            inputDitry: passwordDitry,
            onBlur: blurHandlerPassword,
            inputError: passwordError,
          },
        ]}
        buttonText={'Войти'}
        onSubmit={onSubmit}
        isValid={formValid}
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
