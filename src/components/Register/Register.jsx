import React, { useEffect } from 'react';
import './Register.css';
import Form from '../Form/Form.jsx';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { EMAIL_REGEXP, NAME_REGEXP } from '../../constants/regexp';
//мне понравился больше этот вариант с влидацией
// function Register({ onSubmit }) {
//   const link = '/signin';
//   //стайт переменный для страницы логин
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [name, setName] = React.useState('');
//   const [emailDitry, setEmailDitry] = React.useState(false);
//   const [passwordDitry, setPasswordDitry] = React.useState(false);
//   const [nameDitry, setNameDitry] = React.useState(false);
//   const [emailError, setEmailError] = React.useState(
//     'Поле не может быть пустым'
//   );
//   const [passwordError, setPasswordError] = React.useState(
//     'Поле не может быть пустым'
//   );
//   const [nameError, setNameError] = React.useState('Поле не может быть пустым');

//   const [formValid, setFormValid] = React.useState(false);

//   useEffect(() => {
//     emailError || passwordError || nameError
//       ? setFormValid(false)
//       : setFormValid(true);
//   }, [emailError, passwordError, nameError]);

//   //проверка что поле email не было в фокусе
//   const blurHandlerEmail = (e) => {
//     setEmailDitry(true);
//   };
//   //проверка что поле password не было в фокусе
//   const blurHandlerPassword = (e) => {
//     setPasswordDitry(true);
//   };
//   //проверка что поле name не было в фокусе
//   const blurHandlerName = (e) => {
//     console.log('fdsafsa');
//     setNameDitry(true);
//   };

//   //обработка поля email
//   function handleChangeEmail(e) {
//     setEmail(e.target.value);
//     !e.target.value
//       ? setEmailError('поле не может быть пустым')
//       : !EMAIL_REGEXP.test(String(e.target.value).toLowerCase())
//       ? setEmailError('не корректный емаил')
//       : setEmailError('');
//   }
//   // обработака поля pass
//   function handleChangePassword(e) {
//     setPassword(e.target.value);
//     !e.target.value
//       ? setPasswordError('поле не может быть пустым')
//       : e.target.value.length < 2
//       ? setPasswordError('короткий пароль')
//       : setPasswordError('');
//   }

//   // обработака поля name
//   function handleChangeName(e) {
//     console.log(e.target.value);
//     setName(e.target.value);
//     !e.target.value
//       ? setNameError('поле не может быть пустым')
//       : NAME_REGEXP.test(String(e.target.value))
//       ? setNameError('не корректное имя')
//       : setNameError('');
//   }

//   return (
//     <div className="register">
//       <Link to="/" className="register__logo">
//         <img src={logo} alt="логотип" />
//       </Link>
//       <h1 className="register__title">"Добро пожаловать!"</h1>
//       <Form
//         fields={[
//           {
//             title: 'Имя',
//             type: 'name',
//             name: 'name',
//             id: 'signup-field-name',
//             onChange: handleChangeName,
//             valueInput: name,
//             inputDitry: nameDitry,
//             onBlur: blurHandlerName,
//             inputError: nameError,
//           },
//           {
//             title: 'E-mail',
//             type: 'email',
//             name: 'login',
//             id: 'signup-field-login',
//             onChange: handleChangeEmail,
//             valueInput: email,
//             inputDitry: emailDitry,
//             onBlur: blurHandlerEmail,
//             inputError: emailError,
//           },
//           {
//             title: 'Пароль',
//             type: 'password',
//             name: 'pass',
//             id: 'signup-field-pass',
//             onChange: handleChangePassword,
//             valueInput: password,
//             inputDitry: passwordDitry,
//             onBlur: blurHandlerPassword,
//             inputError: passwordError,
//           },
//         ]}
//         buttonText={'Зарегистрироваться'}
//         onSubmit={onSubmit}
//         isValid={formValid}
//       />{' '}
//       <p className="register__text">
//         Уже зарегистрированы?
//         <Link to={link} className="register__link">
//           Войти
//         </Link>
//       </p>
//     </div>
//   );
// }
function Register({ onSubmit }) {
  const link = '/signin';
  //стайт переменный для страницы логин
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [emailError, setEmailError] = React.useState(
    'Поле не может быть пустым'
  );
  const [passwordError, setPasswordError] = React.useState(
    'Поле не может быть пустым'
  );
  const [nameError, setNameError] = React.useState('Поле не может быть пустым');

  const [formValid, setFormValid] = React.useState(false);

  useEffect(() => {
    emailError || passwordError || nameError
      ? setFormValid(false)
      : setFormValid(true);
  }, [emailError, passwordError, nameError]);

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

  // обработака поля name
  function handleChangeName(e) {
    setName(e.target.value);
    !e.target.value
      ? setNameError('поле не может быть пустым')
      : NAME_REGEXP.test(String(e.target.value))
      ? setNameError('не корректное имя')
      : setNameError('');
  }

  return (
    <div className="register">
      <Link to="/" className="register__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h1 className="register__title">"Добро пожаловать!"</h1>
      <Form
        fields={[
          {
            title: 'Имя',
            type: 'name',
            name: 'name',
            id: 'signup-field-name',
            onChange: handleChangeName,
            valueInput: name,
            inputError: nameError,
          },
          {
            title: 'E-mail',
            type: 'email',
            name: 'login',
            id: 'signup-field-login',
            onChange: handleChangeEmail,
            valueInput: email,
            inputError: emailError,
          },
          {
            title: 'Пароль',
            type: 'password',
            name: 'pass',
            id: 'signup-field-pass',
            onChange: handleChangePassword,
            valueInput: password,
            inputError: passwordError,
          },
        ]}
        buttonText={'Зарегистрироваться'}
        onSubmit={onSubmit}
        isValid={formValid}
      />{' '}
      <p className="register__text">
        Уже зарегистрированы?
        <Link to={link} className="register__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
