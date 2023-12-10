import checkResponse from './checkResponse';
import { URL_MY_API, headers } from '../constants/constForApi';

//проверка токена
export const chekTokenUser = (token) => {
  return fetch(`${URL_MY_API}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

export const register = (name, email, password) => {
  return fetch(`${URL_MY_API}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  console.log({ email, password });
  return fetch(`${URL_MY_API}/signin`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};
