import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {lazyFetchReviews} from "../actions";

import Typography from '@material-ui/core/Typography';
import MovieReview from './MovieReview';

const styles = theme => ({
    title: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    noReviews: {
        paddingLeft: theme.spacing.unit * 2,
    },
});

/* Redux Connection */
const mapStateToProps = (state, ownProps) => ({
    movieId: ownProps.movieId,
    reviews: state.getIn(["movies", ownProps.movieId, "reviews"]),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMount: () => dispatch(lazyFetchReviews(ownProps.movieId)),
});

class Reviews extends PureComponent {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const {
            classes,
            movieId,
            reviews,
        } = this.props;

        return (
            <div>
                <Typography variant="h4" className={classes.title}>
                    Reviews
                </Typography>
                {
                    reviews == null || reviews.isEmpty()
                        ? (
                            <Typography variant="subtitle1" className={classes.noReviews}>
                                No reviews
                            </Typography>
                        )
                        : (
                            <div>
                                {
                                    reviews.map((review, index) => (
                                        <MovieReview
                                            key={index}
                                            movieId={movieId}
                                            index={index}
                                        />
                                    ))
                                }
                            </div>
                        )
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Reviews));