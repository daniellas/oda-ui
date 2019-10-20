import {Button} from '@material-ui/core';
import React from 'react';
import {generateCfdReport} from './cfd';
import {connect} from 'react-redux';
import {createAction} from '../store/actionCreators';
import {storeCfdReport} from './actionTypes';
import {endWith, map, startWith} from 'rxjs/operators';
import {requestEnd, requestFailure, requestStart} from '../http/actions';

const CfdReportGenerator = ({aggregate, interval, items, prios, timeRange, generate}) => (
  <Button variant="contained" color="primary" onClick={() => generate(aggregate, interval, items, prios, timeRange)}>
    Generate CFD report
  </Button>
);

const mapStateToProps = state => ({
  aggregate: state.cfd.aggregate,
  interval: state.cfd.interval,
  items: state.cfd.items,
  prios: state.cfd.prios,
  timeRange: state.cfd.timeRange
});

const mapDispatchToProps = dispatch => ({
  generate: (aggregate, interval, items, prios, timeRange) => generateCfdReport(aggregate, interval, items, prios, timeRange)
    .pipe(
      map(i => ({
        type: storeCfdReport,
        payload: i.response
      }))
    ).pipe(
      startWith(requestStart),
      endWith(requestEnd)
    )
    .subscribe(
      i => dispatch(createAction(i.type, i.payload)),
      () => dispatch(requestFailure))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdReportGenerator);