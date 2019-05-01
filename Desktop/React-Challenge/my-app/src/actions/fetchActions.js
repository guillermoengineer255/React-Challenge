import * as ActionTypes from './actionTypes';
import ApiImages from '../api/ApiImages';
import ApiSettings from '../api/ApiSettings';
import getFromApi from '../api/getFromApi';
import {notifyError, notifyFetching, notifyIdle, enqueueNotification} from "./notificationActions";
import {loadFaves} from "./favoritesActions";

const debug = require('debug')('prueba-tecnica-mediastream:fetchActions');

export const setApiImages = (apiImages) => ({
    type: ActionTypes.SET_API_IMAGES,
    payload: {apiImages},
});

export const fetchedPage = (page, results) => ({
    type: ActionTypes.FETCHED_PAGE,
    payload: {page, results},
});

export const fetchedReviews = (movieId, results) => ({
    type: ActionTypes.FETCHED_REVIEWS,
    payload: {movieId, results},
});

export const fetchedMovie = (movieId, result) => ({
    type: ActionTypes.FETCHED_MOVIE,
    payload: {movieId, result},
});

export const initialize = () => (dispatch) => {
    const onError = (error) => {
        debug("Error", error);
        dispatch(notifyError());
        dispatch(enqueueNotification("Error trying to fetch configuration from TMDb", "error"));
        throw new Error(error);
    };

    return getFromApi(
        ApiSettings.configurationUrl(),
        response => {
            const configuration = JSON.parse(response);
            try {
                return dispatch(setApiImages(new ApiImages(configuration)));
            } catch (error) {
                onError(error);
            }
        },
        onError
    )
        .then(() => dispatch(loadFaves()))
        .then(() => dispatch(fetchNextPage()))
        .catch(error => {
            debug("Unable to recover from error", error);
            alert("The App has run into an error and is unable to recover.");
        })
    ;
};

export const fetchNextPage = () => (dispatch, getState) => {
    const onError = (error) => {
        debug("Error fetching next page", error);
        dispatch(notifyError());
        return dispatch(enqueueNotification("Error trying to fetch next page from TMDb", "error"));
    };

    const onSuccess = (response) => {
        try {
            const parsedResponse = JSON.parse(response);
            const results = parsedResponse.results;
            const page = parsedResponse.page;
            dispatch(fetchedPage(page, results));
            return dispatch(notifyIdle());
        } catch (error) {
            return onError(error);
        }
    };

    const onPending = () => dispatch(notifyFetching());

    const nextPageToGet = getState().getIn(["status", "lastPageFetched"]) + 1;
    return getFromApi(ApiSettings.popularMovies(nextPageToGet), onSuccess, onError, onPending);
};

const fetchReviews = (movieId) => (dispatch) => {
    const onError = (error) => {
        debug("Error fetching movie reviews", error);
        dispatch(enqueueNotification("Error trying to fetch reviews for movie", "error"));
        return dispatch(notifyError());
    };

    const onSuccess = (response) => {
        try {
            const parsedResponse = JSON.parse(response);
            const results = parsedResponse.results;
            dispatch(fetchedReviews(movieId, results));
            return dispatch(notifyIdle());
        } catch (error) {
            return onError(error);
        }
    };

    const onPending = () => dispatch(notifyFetching());

    return getFromApi(ApiSettings.reviews(movieId), onSuccess, onError, onPending);
};

const fetchMovie = (movieId) => (dispatch) => {
    const onError = (error) => {
        debug("Error fetching movie", error);
        dispatch(enqueueNotification("Error trying to fetch movie", "error"));
        return dispatch(notifyError());
    };

    const onSuccess = (response) => {
        try {
            const parsedResponse = JSON.parse(response);
            dispatch(fetchedMovie(movieId, parsedResponse));
            return dispatch(notifyIdle());
        } catch (error) {
            return onError(error);
        }
    };

    const onPending = () => dispatch(notifyFetching());

    return getFromApi(ApiSettings.movie(movieId), onSuccess, onError, onPending);
};

export const lazyFetchMovie = (movieId) => (dispatch, getState) => {
    const movie = getState().getIn(["movies", movieId]);
    if ( movie == null ||
        ( movie.get("homepage") === undefined
            && movie.get("imdb_id") === undefined
            && movie.get("tagline") === undefined ) ) {
        return dispatch(fetchMovie(movieId));
    }
};

export const lazyFetchReviews = (movieId) => (dispatch, getState) => {
    const reviews = getState().getIn(["movies", movieId, "reviews"]);
    if ( reviews === undefined ) {
        return dispatch(fetchReviews(movieId));
    }
};
