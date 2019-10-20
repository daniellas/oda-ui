import {FormControl, FormGroup, FormLabel} from '@material-ui/core';
import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {createAction} from '../store/actionCreators';
import {changeCfdTimeRangeEnd, changeCfdTimeRangeStart} from './actionTypes';
import {connect} from 'react-redux';

const CfdTimeRangeSelector = ({start, end, changeStart, changeEnd}) => (
  <FormControl component="fieldset">
    <FormLabel>Created after:</FormLabel>
    <FormGroup row>
      <KeyboardDatePicker format="YYYY-MM-DD" value={start} onChange={changeStart} variant="inline" autoOk={true}/>
    </FormGroup>
    {/*<FormGroup row>*/}
    {/*  <KeyboardDatePicker format="YYYY-MM-DD" value={end} onChange={changeEnd} variant="inline" autoOk={true}/>*/}
    {/*</FormGroup>*/}
  </FormControl>
);

const mapStateToProps = state => ({
  start: state.cfd.timeRange.start,
  end: state.cfd.timeRange.end
});

const mapDispatchToProps = (dispatch) => ({
  changeStart: event => dispatch(createAction(changeCfdTimeRangeStart, event)),
  changeEnd: event => dispatch(createAction(changeCfdTimeRangeEnd, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdTimeRangeSelector);