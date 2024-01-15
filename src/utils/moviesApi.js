import checkResponse from './checkResponse.js';
import { BASE_URL } from '../constants/constForApi.js';

export default function getCards() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}
