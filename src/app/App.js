import React from 'react';
import {Grid, LinearProgress, makeStyles, Toolbar} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import reducerRegistry from './store/reducerRegistry';
import cfdReducer from './cfd/reducer';
import JiraDataDownloader from './jira/JiraDataDownloader';
import CfdDashboard from './cfd/CfdDashboard';
import httpReducer from './http/reducer';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
    marginBottom: '5px'
  },
  progress: {
    height: '4px'
  }
}));

const toggleProgress = (visible, clsName) => {
  if (visible) {
    return <LinearProgress/>;
  }

  return <div className={clsName}/>;
};

const app = ({progressVisible}) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false}>
      <AppBar position="fixed">
        {toggleProgress(progressVisible, classes.progress)}
        <Toolbar>
          <JiraDataDownloader/>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}/>
      <Grid container>
        <CfdDashboard/>
      </Grid>
    </Container>
  );
};

reducerRegistry.register('cfd', cfdReducer);
reducerRegistry.register('http', httpReducer);

const mapStateToProps = state => ({
  progressVisible: state.http.httpInProgress
});

export const App = connect(mapStateToProps)(app);
