import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import JiraStateSelector from '../jira/JiraStateSelector';
import {connect} from 'react-redux';
import {createAction} from '../store/actionCreators';
import {selectCfdFinalState} from './actionTypes';
import InputLabel from '@material-ui/core/InputLabel';

const CfdFinalStateSelector = ({selectedProject, selectedState, selectState}) => {
  if (!selectedProject) return null;

  return (
    <FormControl component="fieldset">
      <InputLabel>Final state:</InputLabel>
      <JiraStateSelector minWidth={200} selectedState={selectedState} onChange={selectState}/>
    </FormControl>
  );
};

const mapStateToProps = state => ({
  selectedProject: state.jira.selectedProject,
  selectedState: state.cfd.finalState
});

const mapDispatchToProps = (dispatch) => ({
  selectState: v => dispatch(createAction(selectCfdFinalState, v))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdFinalStateSelector);