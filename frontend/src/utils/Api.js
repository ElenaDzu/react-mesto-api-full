export default class Api {
  baseUrl = "";
  headers = null;

  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.headers.authorization = options.token;
  }

  _getResult(res) {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    const url = "/cards";
    return fetch(this.baseUrl + url, { headers: this.headers }).then(
      this._getResult
    );
  }

  getUserInfo() {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    const url = "/users/me";
    return fetch(this.baseUrl + url, { headers: this.headers }).then(
      this._getResult
    );
  }

  setUserInfo(name, about) {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    const url = "/users/me";
    return fetch(this.baseUrl + url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResult);
  }

  postCard(name, link) {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    const url = "/cards";
    return fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResult);
  }

  deleteCard(cardId) {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    const url = `/cards/${cardId}`;
    return fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResult);
  }

  likeCard(cardId) {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    const url = `/cards/${cardId}/likes`;
    return fetch(this.baseUrl + url, {
      method: "PUT",
      headers: this.headers,
    }).then(this._getResult);
  }

  UnlikeCard(cardId) {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    const url = `/cards/${cardId}/likes`;
    return fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResult);
  }

  changeLikeCardStatus(cardId, like) {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    if (like) {
      return this.likeCard(cardId);
    } else {
      return this.UnlikeCard(cardId);
    }
  }

  setAvatar(avatar) {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    const url = "/users/me/avatar";
    return fetch(this.baseUrl + url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResult);
  }
}

export const api = new Api({
  baseUrl: "http://api.frontend15.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
  token: "Bearer 16d5d399-f287-4ea5-b24b-9feae8ea6a1a",
});
