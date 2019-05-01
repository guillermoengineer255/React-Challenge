import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 1,
        paddingRight: theme.spacing.unit * 1,
    },
    title: {
        marginBottom: theme.spacing.unit * 1,
    },
    content: {
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 2,
    }
});

/* Redux Connection */
const mapStateToProps = (state, ownProps) => ({
    author: state.getIn(["movies", ownProps.movieId, "reviews", ownProps.index, "author"]),
    content: state.getIn(["movies", ownProps.movieId, "reviews", ownProps.index, "content"]),
    url: state.getIn(["movies", ownProps.movieId, "reviews", ownProps.index, "url"]),
    id: state.getIn(["movies", ownProps.movieId, "reviews", ownProps.index, "id"]),
});

function Reviews(
    {
         classes,
         author,
         content,
         url,
         id,
     }
) {
    return (
        <Card id={`review-id-${id}`} className={classes.container}>
            <CardContent>
                <Typography variant="h5" className={classes.title}>
                    by: {author}
                </Typography>
                <Typography variant="body1" className={classes.content}>
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={url} size="small" target="_blank" color="primary">
                    Permalink
                </Button>
            </CardActions>
        </Card>
    );
}

export default connect(mapStateToProps)(withStyles(styles)(Reviews));