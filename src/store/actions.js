import Cookies from "js-cookie";
import Api from "../utils/Api";
import {
  getGamesAction,
  getCurrentGameAction,
  setIsLoadingAction,
  setError,
} from "./gameReducer";
import { setExpiresTime } from "../utils/cookiesExpiresTime";

export const getGames = (dispatch, platform, genre, sort) => {
  dispatch(setIsLoadingAction(true));
  dispatch(setError(false));
  Api.getGames(platform, genre, sort)
    .then((res) => {
      dispatch(getGamesAction([...res]));
    })
    .then(() => {
      dispatch(setIsLoadingAction(false));
    })
    .catch((err) => {
      dispatch(setError(true));
      console.error(err);
      dispatch(setIsLoadingAction(false));
    });
};

export const getCurrentGame = (id, dispatch) => {
  dispatch(setIsLoadingAction(true));
  Api.getCurrentGame(id)
    .then((currentGame) => {
      dispatch(getCurrentGameAction(currentGame));
      Cookies.set(id, JSON.stringify(currentGame), {
        expires: setExpiresTime(),
      });
    })
    .then(() => {
      dispatch(setIsLoadingAction(false));
    })
    .catch((err) => {
      dispatch(setError(true));
      console.error(err);
      dispatch(setIsLoadingAction(false));
    });
};
