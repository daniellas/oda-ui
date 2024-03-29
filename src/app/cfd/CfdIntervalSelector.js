import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {selectCfdInterval} from './actionTypes';
import {connect} from 'react-redux';
import {intervals} from './cfd';

const CfdIntervalSelector = ({interval, selectInterval}) => (
  <FormControl component="fieldset">
    <FormLabel>Interval:</FormLabel>
    <RadioGroup row name="cycle" value={interval} onChange={e => selectInterval(e.target.value)}>
      <FormControlLabel value={intervals.week} label="Week" control={<Radio/>}/>
      <FormControlLabel value={intervals.day} label="Day" control={<Radio/>}/>
    </RadioGroup>
  </FormControl>
);

const mapStateToProps = state => ({
  interval: state.cfd.interval
});

const mapDispatchToProps = dispatch => ({
  selectInterval: interval => dispatch(createAction(selectCfdInterval, interval))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdIntervalSelector);