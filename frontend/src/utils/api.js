class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _loadingData(isLoading, buttonSelector) {
    if (isLoading) {
      document.querySelector(buttonSelector).textContent = "Salvando...";
    } else {
      document.querySelector(buttonSelector).textContent = "Salvar";
    }
  }

  addCard(data) {
    this._loadingData(true, ".popup__button");
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
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
      .catch((err) => {
        console.log(err);
      })
      .finally(this._loadingData(false, ".popup__button"));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          // return res.json();
          return cardId;
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    const likeMethod = isLiked ? "PUT" : "DELETE";
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: likeMethod,
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo({ name, about }) {
    this._loadingData(true, ".popup__button");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
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
      .catch((err) => {
        console.log(err);
      })
      .finally(this._loadingData(false, ".popup__button"));
  }

  setUserAvatar(imageLink) {
    this._loadingData(true, ".popup__button");
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
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
      .catch((err) => {
        console.log(err);
      })
      .finally(this._loadingData(false, ".popup__button"));
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_cohort_01",
  headers: {
    authorization: "0c70245d-208a-4884-9ebb-077526421f9a",
    "Content-Type": "application/json",
  },
});

export default api;
