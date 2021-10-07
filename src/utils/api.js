class Api {
  constructor() {
    this.baseUrl = 'https://api.pokemontcg.io/v2';
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then(this.checkResponse);
  }

  getTypes() {
    return fetch(`${this.baseUrl}/types`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then(this.checkResponse);
  }

  getSubtypes() {
    return fetch(`${this.baseUrl}/subtypes`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then(this.checkResponse);
  }
}

const api = new Api();
export default api;