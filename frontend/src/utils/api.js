const { REACT_APP_ENV, REACT_APP_APIDOMAIN } = process.env;

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _loadingData(isLoading, buttonSelector) {
    if (isLoading) {
      document.querySelector(buttonSelector).textContent = 'Salvando...';
    } else {
      document.querySelector(buttonSelector).textContent = 'Salvar';
    }
  }

  addCard(data) {
    this._loadingData(true, '.popup__button');
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .finally(this._loadingData(false, '.popup__button'));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        // return res.json();
        return cardId;
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    const likeMethod = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: likeMethod,
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setUserInfo({ name, about }) {
    this._loadingData(true, '.popup__button');
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .finally(this._loadingData(false, '.popup__button'));
  }

  setUserAvatar(imageLink) {
    this._loadingData(true, '.popup__button');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageLink,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .finally(this._loadingData(false, '.popup__button'));
  }
}

const token = localStorage.getItem('token');

const api = new Api({
  baseUrl:
    REACT_APP_ENV === 'production'
      ? REACT_APP_APIDOMAIN
      : 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default api;
