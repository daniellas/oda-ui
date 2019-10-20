import {Button} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {createAction} from '../store/actionCreators';
import {jiraDataDownloaded} from './actionTypes';
import {downloadJiraData} from './jira';

const JiraDataDownloader = ({downloadJiraData}) => (
  <Button variant="contained" color="default" onClick={() => downloadJiraData('CRYP')}>
    Download JIRA data
  </Button>
);


const mapDispatchToProps = dispatch => ({
  downloadJiraData: projectKey => downloadJiraData(projectKey)
    .subscribe(resp => dispatch(createAction(jiraDataDownloaded)))
});

export default connect(null, mapDispatchToProps)(JiraDataDownloader);