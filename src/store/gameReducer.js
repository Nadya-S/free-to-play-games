const defaultState = {
  games: [],
  currentGame: {},
  isLoading: false,
  error: false,
  cardLimit: 12,
  platform: "all",
  genre: "all",
  sort: "relevance",
};

const GET_GAMES = "GET_GAMES";
const GET_CURRENT_GAME = "GET_CURRENT_GAME";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_ERROR = "SET_ERROR";
const SET_CARD_LIMIT = "SET_CARD_LIMIT";
const SET_PLATFORM = "SET_PLATFORM";
const SET_GENRE = "SET_GENRE";
const SET_SORT = "SET_SORT";

export const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, games: action.payload };
    case GET_CURRENT_GAME:
      return { ...state, currentGame: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_CARD_LIMIT:
      return { ...state, cardLimit: action.payload };
    case SET_PLATFORM:
      return { ...state, platform: action.payload };
    case SET_GENRE:
      return { ...state, genre: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};

export const getGamesAction = (payload) => ({ type: GET_GAMES, payload });
export const getCurrentGameAction = (payload) => ({
  type: GET_CURRENT_GAME,
  payload,
});
export const setIsLoadingAction = (payload) => ({
  type: SET_IS_LOADING,
  payload,
});
export const setError = (payload) => ({ type: SET_ERROR, payload });
export const setCardLimit = (payload) => ({ type: SET_CARD_LIMIT, payload });
export const setPlatform = (payload) => ({ type: SET_PLATFORM, payload });
export const setGenre = (payload) => ({ type: SET_GENRE, payload });
export const setSort = (payload) => ({ type: SET_SORT, payload });
