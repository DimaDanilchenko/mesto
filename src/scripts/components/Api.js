export default class Api {
  constructor({ link, token }) {
    this._link = link;
    this._token = token;
  }
  //Обработка ответа
  _serverResponse(){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  //Авторизация


  //Данные пользователя
  getUserProfile() {
    return fetch(`${this._link}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._serverResponse)
  }

  //Загрузка карточек
}
