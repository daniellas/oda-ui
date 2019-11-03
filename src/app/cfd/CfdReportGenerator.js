import {Button} from '@material-ui/core';
import React from 'react';
import {generateCfdReport} from './cfd';
import {connect} from 'react-redux';
import {storeCfdReport} from './actionTypes';
import {dispatchError, dispatchSuccess, progressAction} from '../http/http';

const CfdReportGenerator = ({aggregate, interval, items, prios, timeRange, project, entryState, finalState, generate}) => (
  <Button variant="contained" color="primary"
          onClick={() => generate(project, aggregate, interval, items, prios, timeRange, entryState, finalState)}
          disabled={!project}>
    Generate CFD report
  </Button>
);

const mapStateToProps = state => ({
  aggregate: state.cfd.aggregate,
  interval: state.cfd.interval,
  items: state.cfd.items,
  prios: state.cfd.prios,
  timeRange: state.cfd.timeRange,
  project: state.jira.selectedProject,
  entryState: state.cfd.entryState,
  finalState: state.cfd.finalState
});

const mapDispatchToProps = dispatch => ({
  generate: (
    project,
    aggregate,
    interval,
    items,
    prios,
    timeRange,
    entryState,
    finalState) =>
    generateCfdReport(
      project,
      aggregate,
      interval,
      items,
      prios,
      timeRange,
      entryState,
      finalState)
      .pipe(progressAction(storeCfdReport))
      .subscribe(dispatchSuccess(dispatch), dispatchError(dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdReportGenerator);