export default class Api {
  constructor({ link, token }) {
    this._link = link;
    this._token = token;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
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
    return fetch(`${this._link}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.popupName,
        about: data.popupJob
      })
    })
      .then(this._handleResponse)
  }
  //Изменение аватарки
  setUserAvatar(data) {
    return fetch(`${this._link}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._handleResponse)
  }
  //Добавление карточки
  addNewCard(data) {
    return fetch(`${this._link}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._handleResponse)
  }
  // Удаление карточки
  removeCard(id) {
    return fetch(`${this._link}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

    // Постановка лайка
    addLikeCard(id) {
      return fetch(`${this._link}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
      .then(this._handleResponse)
    }
    // Снятие лайка
    removeLikeCard(id) {
      return fetch(`${this._link}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
      .then(this._handleResponse)
    }
}
