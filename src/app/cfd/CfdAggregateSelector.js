import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {selectCfdAggregate} from './actionTypes';
import {connect} from 'react-redux';
import {aggregates} from './cfd';

const CfdAggregateSelector = ({aggregate, selectAggregate}) => (
  <FormControl component="fieldset">
    <FormLabel>Metric:</FormLabel>
    <RadioGroup row name="aggregate" value={aggregate} onChange={e => selectAggregate(e.target.value)}>
      <FormControlLabel value={aggregates.count} label="Count" control={<Radio/>}/>
      <FormControlLabel value={aggregates.sumEstimate} label="Sum estimate" control={<Radio/>}/>
    </RadioGroup>
  </FormControl>
);

const mapStateToProps = state => ({
  aggregate: state.cfd.aggregate
});

const mapDispatchToProps = dispatch => ({
  selectAggregate: aggregate => dispatch(createAction(selectCfdAggregate, aggregate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdAggregateSelector);