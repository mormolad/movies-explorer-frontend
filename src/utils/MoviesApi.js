import checkResponse from './checkResponse.js';
import { BASE_URL } from '../constants/constForApi';

export default function getCards() {
  console.log(checkResponse);
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}
