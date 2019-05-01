import * as ActionTypes from '../actions/actionTypes';
import {fromJS, Map} from 'immutable';

export default (state = Map(), action = {}) => {
    switch (action.type) {
        case ActionTypes.FETCHED_PAGE:
            let result = state;

            action.payload.results.forEach((movie) => {
                result = result.update(
                    movie.id,
                    Map(),
                    mov => mov.mergeDeep(fromJS(movie))
                );
            });

            return result;
        case ActionTypes.FETCHED_REVIEWS:
            return state.update(
                action.payload.movieId,
                Map(),
                movie => movie.set("reviews", fromJS(action.payload.results))
            );
        case ActionTypes.FETCHED_MOVIE:
            return state.update(
                action.payload.movieId,
                Map(),
                movie => movie.mergeDeep(fromJS(action.payload.result)),
            );
        default:
            return state;
    }
};