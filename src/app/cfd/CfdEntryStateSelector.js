import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import JiraStateSelector from '../jira/JiraStateSelector';
import {connect} from 'react-redux';
import {createAction} from '../store/actionCreators';
import {selectCfdEntryState} from './actionTypes';
import InputLabel from '@material-ui/core/InputLabel';

const CfdEntryStateSelector = ({selectedProject, selectedState, selectState}) => {
  if (!selectedProject) return null;

  return (
    <FormControl component="fieldset">
      <InputLabel>Entry state:</InputLabel>
      <JiraStateSelector minWidth={200} selectedState={selectedState} onChange={selectState}/>
    </FormControl>
  );
};

const mapStateToProps = state => ({
  selectedProject: state.jira.selectedProject,
  selectedState: state.cfd.entryState
});

const mapDispatchToProps = (dispatch) => ({
  selectState: v => dispatch(createAction(selectCfdEntryState, v))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdEntryStateSelector);