import Select from '@material-ui/core/Select';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {createAction} from '../store/actionCreators';
import {getConfig, getProjects} from './jira';
import store from '../store/store';
import {selectJiraProject, storeJiraProjectConfig, storeJiraProjects} from './actionTypes';
import {connect} from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {dispatchResponse, dispatchSuccess, observableToAction} from '../http/http';
import {merge, of} from 'rxjs';

getProjects().subscribe(dispatchResponse(store.dispatch, storeJiraProjects));

const JiraProjectSelector = ({minWidth, projects, selectedProject, selectProject}) => (
  <FormControl>
    <InputLabel>Select project:</InputLabel>
    <Select value={selectedProject} onChange={e => selectProject(e.target.value)} autoWidth={true}
            style={{minWidth: minWidth}}>
      {projects.map(p => <MenuItem value={p} key={p}>{p}</MenuItem>)}
    </Select>
  </FormControl>
);

const mapStateToProps = state => ({
  projects: state.jira.projects,
  selectedProject: state.jira.selectedProject
});

const mapDispatchToProps = dispatch => ({
  selectProject: p => merge(of(createAction(selectJiraProject, p)), getConfig(p).pipe(observableToAction(storeJiraProjectConfig)))
    .subscribe(dispatchSuccess(dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(JiraProjectSelector);