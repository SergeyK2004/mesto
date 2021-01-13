export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(this._baseUrl + "cards", {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(this._baseUrl + "users/me", {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setUserInfo(item) {
    return fetch(this._baseUrl + "users/me", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: item.name,
        about: item.spec,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  setUserAvatar(item) {
    return fetch(this._baseUrl + "users/me/avatar", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: item.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setNewCard(item) {
    return fetch(this._baseUrl + "cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  delCard(cardObject) {
    return fetch(this._baseUrl + "cards/" + cardObject.cardId, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  reverseLike(likedCardId, deleteLike) {
    return fetch(this._baseUrl + "cards/likes/" + likedCardId, {
      headers: this._headers,
      method: deleteLike ? "DELETE" : "PUT",
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}
