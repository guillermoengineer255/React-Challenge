import * as ActionTypes from "./actionTypes";

export const notifyIdle = () => ({
    type: ActionTypes.NOTIFY_IDLE,
    payload: {},
});

export const notifyFetching = () => ({
    type: ActionTypes.NOTIFY_FETCHING,
    payload: {},
});

export const notifyError = () => ({
    type: ActionTypes.NOTIFY_ERROR,
    payload: {},
});

export const setSnackbarEnqueuer = (snackbarEnqueuer) => ({
    type: ActionTypes.SET_SNACKBAR_ENQUEUER,
    payload: {snackbarEnqueuer},
});

export const enqueueNotification = (message, variant) => ({
    type: ActionTypes.ENQUEUE_NOTIFICATION,
    payload: {message, variant},
});
