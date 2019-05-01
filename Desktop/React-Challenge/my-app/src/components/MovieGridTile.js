import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const styles = theme => ({
    tile: {
        minWidth: "300px",
        minHeight: "169px",
        width: "24vw",
        height: "13.5vw",
    },
    titleBar: {

    },
    title: {

    },
    subtitle: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
    },
    score: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        color: theme.palette.secondary.light,
    },
    language: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        textTransform: "uppercase",
    },
    popularity: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    link: {
        color: "rgb(255,255,255)",
        textDecoration: "none",
    }
});

const mapStateToProps = (state, ownProps) => {
    const movieId = ownProps.movieId;
    const movie = state.getIn(["movies", movieId]);
    if ( movie != null ) {
        const apiImages = state.getIn(["status", "apiImages"]);
        return {
            movieId: movieId,
            title: movie.get("title"),
            voteAverage: movie.get("vote_average"),
            popularity: movie.get("popularity"),
            language: movie.get("original_language"),
            backdropUrl: apiImages.getBackdropUrl(movie.get("backdrop_path")),
        };
    } else {
        return {
            movieId: movieId,
        };
    }
};

function MovieGridTile(
    {
        classes,
        movieId,
        title,
        voteAverage,
        popularity,
        language,
        backdropUrl,
    }
) {
    return (
        <GridListTile className={classes.tile}>
            <Link className={classes.link} to={`/ptm/movie/${movieId}`}>
                <img
                    src={backdropUrl}
                    alt={title}
                    className={classes.image}
                />
                <GridListTileBar
                    className={classes.titleBar}
                    title={<div className={classes.title}>{title}</div>}
                    subtitle={
                        <div className={classes.subtitle}>
                            <div className={classes.score}><StarHalfIcon fontSize="small" />{voteAverage}</div>
                            <div className={classes.language}>{language}</div>
                            <div className={classes.popularity}>Popularity: {popularity}</div>
                        </div>
                    }
                />
            </Link>
        </GridListTile>
    );
}

export default connect(mapStateToProps)(withStyles(styles)(MovieGridTile));