import * as ActionTypes from '../actions/actionTypes';
import {List} from 'immutable';

export default (state = List(), action = {}) => {
    switch (action.type) {
        case ActionTypes.FETCHED_PAGE:
            const toAdd = action.payload.results.map(movie => movie.id);
            return state.concat(toAdd);
        default:
            return state;
    }
};
