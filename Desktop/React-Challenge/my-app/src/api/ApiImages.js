const EXPECTED_BACKDROP_SIZE = "w780";
const EXPECTED_LOGO_SIZE = "w300";
const EXPECTED_POSTER_SIZE = "w780";
const EXPECTED_PROFILE_SIZE = "h632";
const EXPECTED_STILL_SIZE = "w300";
const DEFAULT_SIZE = "original";

/**
 * Return the last element of the given array. Array must be not null or empty.
 * @param array {Array<t>} A non-empty array.
 * @returns {t} The last element of the array.
 */
const getLast = (array) => array[array.length - 1];

/**
 * Class to handle building the URLs for the required images to fetch given the
 * correctly pre-loaded configuration JSON.
 */
export default class ApiImages {
    /**
     * The configuration JSON document is expected to be the one specified by TMDb at
     * https://developers.themoviedb.org/3/configuration/get-api-configuration
     *
     * @param configuration {object} The configuration object
     */
    constructor(configuration) {
        this.configuration = configuration;

        const images = this.configuration.images;

        // noinspection JSUnresolvedVariable
        this.backdropSize = images.backdrop_sizes.includes(EXPECTED_BACKDROP_SIZE)
            ? EXPECTED_BACKDROP_SIZE
            : getLast(images.backdrop_sizes)
        ;

        // noinspection JSUnresolvedVariable
        this.logoSize = images.logo_sizes.includes(EXPECTED_LOGO_SIZE)
            ? EXPECTED_LOGO_SIZE
            : getLast(images.logo_sizes)
        ;

        // noinspection JSUnresolvedVariable
        this.posterSize = images.poster_sizes.includes(EXPECTED_POSTER_SIZE)
            ? EXPECTED_POSTER_SIZE
            : getLast(images.poster_sizes)
        ;

        // noinspection JSUnresolvedVariable
        this.profileSize = images.profile_sizes.includes(EXPECTED_PROFILE_SIZE)
            ? EXPECTED_PROFILE_SIZE
            : getLast(images.profile_sizes)
        ;

        // noinspection JSUnresolvedVariable
        this.stillSize = images.still_sizes.includes(EXPECTED_STILL_SIZE)
            ? EXPECTED_STILL_SIZE
            : getLast(images.still_sizes)
        ;
    }

    /**
     * Given a path and a size, this method returns the built full URL to fetch an image
     * from TMDb API.
     * @param path {string} The path of the image.
     * @param size {string} The requested size for the image.
     * @returns {string} A string with the URL to fetch an image from.
     */
    getImageUrl(path, size = DEFAULT_SIZE) {
        if ( path == null || "" === path ) {
            return "";
        }
        // noinspection JSUnresolvedVariable
        return `${this.configuration.images.secure_base_url}${size}${path}`;
    }

    getBackdropUrl(path) {
        return this.getImageUrl(path, this.backdropSize);
    }

    getLogoUrl(path) {
        return this.getImageUrl(path, this.logoSize);
    }

    getPosterUrl(path) {
        return this.getImageUrl(path, this.posterSize);
    }

    getProfileUrl(path) {
        return this.getImageUrl(path, this.profileSize);
    }

    getStillUrl(path) {
        return this.getImageUrl(path, this.stillSize);
    }
}