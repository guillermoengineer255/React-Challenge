const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'b08108a29f17a20ff88b2e2107172444';
const apiKeyParam = `api_key=${apiKey}`;

export default {
    configurationUrl: () => `${baseUrl}/configuration?${apiKeyParam}`,
    popularMovies: (page = 1) => `${baseUrl}/movie/popular?page=${page}&${apiKeyParam}`,
    reviews: (movieId) => {
        if ( movieId == null || "" === movieId ) {
            throw new Error("movieId can't be empty");
        }
        return `${baseUrl}/movie/${movieId}/reviews?${apiKeyParam}`;
    },
    movie: (movieId) => {
        if ( movieId == null || "" === movieId ) {
            throw new Error("movieId can't be empty");
        }

        return `${baseUrl}/movie/${movieId}?${apiKeyParam}`;
    },
};