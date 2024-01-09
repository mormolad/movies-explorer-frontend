export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const URL_MY_API = 'https://api.filmissio.nomoredomainsmonster.ru';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const DEVICE_PARAMS = {
  desktop: {
    width: 1114,
    cards: {
      total: 12,
      more: 3,
    },
  },
  tablet: {
    width: 744,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 350,
    cards: {
      total: 5,
      more: 2,
    },
  },
};
