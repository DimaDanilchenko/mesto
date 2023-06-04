export default class Api {
  constructor({link, token}) {
    this._link = link;
    this._token = token;
}

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserProfile() {
    return fetch(`${this._link}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }


  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }
    // Редактирование профиля
    setUserProfile(data) {
      return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._handleResponse)
    }
}
