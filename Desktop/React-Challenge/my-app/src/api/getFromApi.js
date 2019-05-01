const debug = require('debug')('prueba-tecnica-mediastream:ApiRequest');

export default (
    url,
    onSuccess,
    onError = () => {},
    onPending = () => {},
) => {
    if ( url == null || url === "" || onSuccess == null || typeof onSuccess !== "function" ) {
        throw new Error("url and onSuccess callback can't be null or empty");
    }

    onPending();
    debug(`Starting GET request to ${url}`);

    return fetch(url, { method: "GET" })
        .then(response => {
            return response.text()
                .then(text => {
                    if ( response.ok ) {
                        debug("Response loaded", text);
                        return onSuccess(text);
                    } else {
                        debug("Response loaded with error", text);
                        return onError(text);
                    }
                });
        })
        .catch(error => {
            debug("Request error", error);
            return onError(error);
        });
};
