import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {initialize} from "../actions";
import * as AppGlobalStatus from '../types/appGlobalStatus';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import GlobalAppBar from './GlobalAppBar';
import MovieDetails from './MovieDetails';
import MoviesGrid from './MoviesGrid';
import Notifier from './Notifier';

const styles = theme => ({
    app: {
        background: theme.palette.background.default,
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 4,
    },
    loadingContainer: {
        textAlign: "center"
    },
});

/* Redux Connection */
const mapStateToProps = (state) => ({
    appGlobalStatus: state.getIn(["status", "appGlobalStatus"])
});

const mapDispatchToProps = (dispatch) => ({
    onMount: () => dispatch(initialize())
});

class App extends React.PureComponent {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const {classes, appGlobalStatus} = this.props;
        return (
            <Router>
                <div className={classes.app}>
                    <Notifier />
                    <GlobalAppBar />
                    {
                        appGlobalStatus === AppGlobalStatus.INITIALIZING
                            ? (
                                <div className={classes.loadingContainer}>
                                    <Typography variant="display1">
                                        App is initializing...
                                    </Typography>
                                    <CircularProgress size={150} />
                                </div>
                            )
                            : (
                                <Switch>
                                    <Redirect exact from="/" to="/ptm/" />
                                    <Route path="/ptm/movie/:movieId" component={MovieDetails} />
                                    <Route path="/ptm/" component={MoviesGrid} />
                                </Switch>
                            )
                    }
                </div>
            </Router>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));