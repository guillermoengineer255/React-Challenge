import * as ActionTypes from "./actionTypes";
import {Map} from "immutable";

const debug = require('debug')('prueba-tecnica-mediastream:favoritesActions');

const setFavorites = (favorites) => ({
    type: ActionTypes.SET_FAVORITES,
    payload: {favorites},
});

export const saveFaves = () => (dispatch, getState) => {
    return new Promise( (resolve) => {
        const faves = getState().getIn(["favorites"]);
        localStorage.removeItem("favorites");
        localStorage.setItem("favorites", JSON.stringify(faves.toJS()));
        debug("saveFaves", localStorage.getItem("favorites"));
        return resolve(localStorage.getItem("favorites"));
    });
};

export const loadFaves = () => (dispatch) => {
    return new Promise( (resolve) => {
        const faves = localStorage.getItem("favorites");
        debug("loadFaves", faves);
        return resolve(dispatch(setFavorites( faves != null ? Map(JSON.parse(faves)) : Map() )));
    });
};

