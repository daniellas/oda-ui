import React from 'react';
import {Grid, LinearProgress, makeStyles, Snackbar, Toolbar} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import reducerRegistry from './store/reducerRegistry';
import cfdReducer from './cfd/reducer';
import CfdDashboard from './cfd/CfdDashboard';
import httpReducer from './http/reducer';
import {connect} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import jiraReducer from './jira/reducer';
import notificationReducer from './notification/reducer';
import {createAction} from './store/actionCreators';
import {closeNotification} from './notification/actionTypes';

const useStyles = makeStyles(theme => ({
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
    marginBottom: '5px'
  },
  progress: {
    height: '4px'
  },
  error: {
    backgroundColor: theme.palette.error.dark
  }
}));

const toggleProgress = (visible, clsName) => {
  if (visible) {
    return <LinearProgress/>;
  }

  return <div className={clsName}/>;
};

const app = ({progressVisible, notification, closeNotification}) => {
  const classes = useStyles();
  const [drawerOpen, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(false);

  return (
    <Container maxWidth={false}>
      <AppBar position="fixed">
        {toggleProgress(progressVisible, classes.progress)}
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            edge="start">
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}/>
      <Drawer variant="persistent" open={drawerOpen}>
        aaa
      </Drawer>
      <Grid container>
        <CfdDashboard/>
      </Grid>
      <Snackbar open={notification.open} autoHideDuration={6000} onClick={closeNotification}
                message={notification.payload} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      </Snackbar>
    </Container>
  );
};

reducerRegistry.register('cfd', cfdReducer);
reducerRegistry.register('http', httpReducer);
reducerRegistry.register('jira', jiraReducer);
reducerRegistry.register('notification', notificationReducer);

const mapStateToProps = state => ({
  progressVisible: state.http.httpInProgress,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  closeNotification: () => dispatch(createAction(closeNotification))
});

export const App = connect(mapStateToProps, mapDispatchToProps)(app);
