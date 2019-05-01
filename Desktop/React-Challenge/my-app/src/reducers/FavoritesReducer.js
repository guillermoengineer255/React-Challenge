import * as ActionTypes from '../actions/actionTypes';
import {Map} from "immutable";

export default (state = Map(), action = {}) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_FAVORITES:
            return state.set(action.payload.movieId, true);
        case ActionTypes.REMOVE_FROM_FAVORITES:
            return state.delete(action.payload.movieId);
        case ActionTypes.SET_FAVORITES:
            return action.payload.favorites;
        default:
            return state;
    }
};
