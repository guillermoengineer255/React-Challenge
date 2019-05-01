import {INITIALIZING} from "../types";

export default () => ({
    appGlobalStatus: INITIALIZING,
    lastPageFetched: 0,
    apiImages: undefined,
    snackbarEnqueuer: undefined,
});