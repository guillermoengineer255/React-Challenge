import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import * as AppGlobalStatus from '../types/appGlobalStatus';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TimerIcon from '@material-ui/icons/Timer';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const styles = theme => ({
    select: {
        color: theme.palette.primary.contrastText,
        minWidth: 150,
        textAlign: 'left',
        marginRight: '1em',
    },
    appBar: {
        position: 'fixed',
    },
    toolbar: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
    },
    errorIcon: {
        color: theme.palette.error.light,
    },
    idleIcon: {
        color: theme.palette.primary.light,
    },
    linearProgress: {
        position: 'absolute',
        width: '100%',
        bottom: -3,
        left: 0,
        right: 0,
    },
    link: {
        color: "#ffffff",
        textDecoration: "none",
    }
});

const mapStateToProps = (state) => ({
    appGlobalStatus: state.getIn(["status", "appGlobalStatus"])
});

function GlobalAppBar({appGlobalStatus, classes}) {
    return (
        <AppBar className={classes.appBar}>
            <Toolbar variant="dense" className={classes.toolbar}>
                <Button
                    component={Link}
                    to="/ptm/"
                    className={classes.link}
                    size="large"
                >
                    <HomeIcon /> Movie List
                </Button>
                {
                    ((appGlobalStatus) => {
                        switch (appGlobalStatus) {
                            case AppGlobalStatus.INITIALIZING:
                                return <PowerSettingsNewIcon />;
                            case AppGlobalStatus.FETCHING:
                                return <TimerIcon />;
                            case AppGlobalStatus.IDLE:
                                return <CheckIcon />;
                            case AppGlobalStatus.ERROR:
                                return <ErrorIcon className={classes.errorIcon} />;
                            default:
                                return <CheckIcon className={classes.idleIcon} />;
                        }
                    })(appGlobalStatus)
                }
                {
                    (appGlobalStatus === AppGlobalStatus.INITIALIZING || appGlobalStatus === AppGlobalStatus.FETCHING)
                    && <LinearProgress color="secondary" className={classes.linearProgress} />
                }
            </Toolbar>
        </AppBar>
    );
}

const GlobalAppBarContainer = connect(
    mapStateToProps
)(withStyles(styles)(withRouter(GlobalAppBar)));

export default GlobalAppBarContainer;