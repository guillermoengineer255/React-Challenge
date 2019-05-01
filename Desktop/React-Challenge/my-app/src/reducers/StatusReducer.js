import * as ActionTypes from '../actions/actionTypes';
import * as AppGlobalStatus from '../types/appGlobalStatus';
import status from '../model/status';
import {fromJS} from "immutable";

const debug = require('debug')('prueba-tecnica-mediastream:StatusReducer');

export default (state = fromJS(status()), action = {}) => {
    switch (action.type) {
        case ActionTypes.NOTIFY_IDLE:
            return state.set("appGlobalStatus", AppGlobalStatus.IDLE);
        case ActionTypes.NOTIFY_FETCHING:
            return state.set("appGlobalStatus", AppGlobalStatus.FETCHING);
        case ActionTypes.NOTIFY_ERROR:
            return state.set("appGlobalStatus", AppGlobalStatus.ERROR);
        case ActionTypes.FETCHED_PAGE:
            return state.set("lastPageFetched", action.payload.page);
        case ActionTypes.SET_API_IMAGES:
            return state.set("apiImages", action.payload.apiImages);
        case ActionTypes.SET_SNACKBAR_ENQUEUER:
            return state.set("snackbarEnqueuer", action.payload.snackbarEnqueuer);
        case ActionTypes.ENQUEUE_NOTIFICATION:
            if ( state.get("snackbarEnqueuer") == null ) {
                debug("snackbarEnqueuer hasn't been set, unable enqueue message", action.payload.message);
                return state;
            }
            return state.get("snackbarEnqueuer")(
                action.payload.message,
                { variant: action.payload.variant || "default" }
            );
        default:
            return state;
    }
};
