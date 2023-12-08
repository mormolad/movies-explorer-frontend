import checkResponse from './utils.js';
import BASE_URL from '../constants/constForApi';

export function getCards() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}
