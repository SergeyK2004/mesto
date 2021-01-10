export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  getInitialCards() {
    return fetch(this._baseUrl + "cards", {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(this._baseUrl + "users/me", {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
