import checkResponse from './utils';

class Auth extends checkResponse.СheckResponse {
  constructor(configFetch) {
    super();
    this.url = configFetch.url;
    this.headers = configFetch.headers;
    this._creckResponse = super._creckResponse;
  }
  //зарегистрировать пользователя и войти в акк
  requestUser({ email, password, endPoint }) {
    return fetch(`${this.url}${endPoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //проверка токена
  chekTokenUser(token) {
    return fetch(`${this.url}users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const auth = new Auth({
  url: 'https://api.filmissio.nomoredomainsmonster.ru/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default auth;
