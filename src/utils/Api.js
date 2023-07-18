class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //приватный метод с условной конструкцией, возвращающей реджект с текстом ошибки.
  _returnResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка" + res.status);
  }

  //публичный метод класса API для GET запроса данных пользователя
  getUserData() {
    return fetch(this._baseUrl + "/users/me", { headers: this._headers }).then(
      this._returnResponse
    );
  }

  //публичный метод класса API для GET запроса массива карточек
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", { headers: this._headers }).then(
      this._returnResponse
    );
  }

  userInfoPatch(data) {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._returnResponse);
  }

  updateAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._returnResponse);
  }

  addCardOnServer(data) {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._returnResponse);
  }

  cardDelete(card) {
    return fetch(this._baseUrl + "/cards/" + card._id, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._returnResponse);
  }

  //с помощью тернарного оператора, объединили два метода в один.
  changeLikeCardStatus(card, status) {
    return fetch(this._baseUrl + "/cards/" + card._id + "/likes", {
      headers: this._headers,
      //избегаем использование if else.
      method: status ? "DELETE" : "PUT",
    }).then(this._returnResponse);
  }
}

//Экспортируем именно экземпляр, а не весь класс. Экспорт у класса убрал.
export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "37444284-40d0-47c4-870b-23d568f81278",
    "Content-Type": "application/json",
  },
});
