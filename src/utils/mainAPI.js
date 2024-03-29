import checkResponse from './checkResponse';
import { URL_MY_API } from '../constants/constForApi';

export const getSavedMovies = () => {
  return fetch(`${URL_MY_API}/movies/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then((res) => (res.ok ? res.json() : { message: [] }));
};

export const saveMovie = (movie) => {
  return fetch(`${URL_MY_API}/movies/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(movie),
  }).then((res) => checkResponse(res));
};

export const deleteMovies = (id) => {
  return fetch(`${URL_MY_API}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then((res) => checkResponse(res));
};

export const editProfile = (name, email) => {
  return fetch(`${URL_MY_API}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => checkResponse(res));
};

export const getUserInfo = () => {
  return fetch(`${URL_MY_API}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
};
