class Api {
  constructor() {
    this.baseUrl = "https://free-to-play-games-database.p.rapidapi.com/api/";
    this._headers = {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    };
  }

  getGames(platform, genre, sort, controller) {
    const url = new URL(`${this.baseUrl}games`);

    platform !== "all" && url.searchParams.append("platform", platform);
    genre !== "all" && url.searchParams.append("category", genre);
    sort !== "relevance" && url.searchParams.append("sort-by", sort);

    return this._sendRequest(url, controller);
  }

  getCurrentGame(itemId, controller) {
    const url = `${this.baseUrl}game?id=${itemId}`;
    return this._sendRequest(url, controller);
  }

  async _sendRequest(url, controller) {
    for (let i = 0; i < 4; i++) {
      let response = await fetch(`${url}`, {
        method: "GET",
        headers: this._headers,
        signal: controller.signal,
      });
      if (response.ok) {
        let json = await response.json();
        return json;
      } else if (i === 3) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    }
  }
}

export default new Api();
