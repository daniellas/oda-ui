import {Button} from '@material-ui/core';
import React from 'react';
import {generateCfdReport} from './cfd';
import {connect} from 'react-redux';
import {createAction} from '../store/actionCreators';
import {storeCfdReport} from './actionTypes';

const CfdReportGenerator = ({interval, items, prios, generate}) => (
  <Button variant="contained" color="primary" onClick={() => generate(interval, items, prios)}>
    Generate CFD report
  </Button>
);

const mapStateToProps = state => ({
  interval: state.cfd.interval,
  items: state.cfd.items,
  prios: state.cfd.prios
});

const mapDispatchToProps = dispatch => ({
  generate: (interval, items, prios) => generateCfdReport(interval, items, prios)
    .subscribe(resp => dispatch(createAction(storeCfdReport, resp.response)))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdReportGenerator);