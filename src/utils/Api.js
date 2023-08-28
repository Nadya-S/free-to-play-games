class Api {
  constructor() {
    this.baseUrl = "https://free-to-play-games-database.p.rapidapi.com/api/";
    this._headers = {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    };
  }

  getGames(platform, genre, sort) {
    const url = new URL(`${this.baseUrl}games`);

    platform !== "all" && url.searchParams.append("platform", platform);
    genre !== "all" && url.searchParams.append("category", genre);
    sort !== "relevance" && url.searchParams.append("sort-by", sort);

    return fetch(`${url}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getCurrentGame(itemId) {
    return fetch(`${this.baseUrl}game?id=${itemId}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export default new Api();
