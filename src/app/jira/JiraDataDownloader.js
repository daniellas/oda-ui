import {Button} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {jiraDataDownloaded} from './actionTypes';
import {downloadData} from './jira';
import {dispatchError, dispatchSuccess, progressAction} from '../http/http';

const JiraDataDownloader = ({downloadJiraData, selectedProject}) => (
  <Button variant="contained" color="default" onClick={() => downloadJiraData(selectedProject)}
          disabled={!selectedProject}>
    Download JIRA data
  </Button>
);

const mapStateToProps = state => ({
  selectedProject: state.jira.selectedProject
});

const mapDispatchToProps = dispatch => ({
  downloadJiraData: projectKey => downloadData(projectKey)
    .pipe(progressAction(jiraDataDownloaded))
    .subscribe(dispatchSuccess(dispatch), dispatchError(dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(JiraDataDownloader);