import {FormControl, FormControlLabel, FormLabel} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {updateCfdPrios} from './actionTypes';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';

const CfdPriosSelector = ({prios, updatePrios}) => (
  <FormControl component="fieldset">
    <FormLabel>Priorities:</FormLabel>
    <FormControlLabel value="Critical" label="Critical"
                      control={<Checkbox onChange={updatePrios} checked={prios.Critical}/>}/>
    <FormControlLabel value="Highest" label="Highest"
                      control={<Checkbox onChange={updatePrios} checked={prios.Highest}/>}/>
    <FormControlLabel value="High" label="High"
                      control={<Checkbox onChange={updatePrios} checked={prios.High}/>}/>
    <FormControlLabel value="Medium" label="Medium"
                      control={<Checkbox onChange={updatePrios} checked={prios.Medium}/>}/>
    <FormControlLabel value="Low" label="Low"
                      control={<Checkbox onChange={updatePrios} checked={prios.Low}/>}/>
    <FormControlLabel value="Lowest" label="Lowest"
                      control={<Checkbox onChange={updatePrios} checked={prios.Lowest}/>}/>
  </FormControl>
);

const mapStateToProps = state => ({
  prios: state.cfd.prios
});

const mapDispatchToProps = (dispatch) => ({
  updatePrios: event => dispatch(createAction(updateCfdPrios, {
    value: event.target.value,
    checked: event.target.checked
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdPriosSelector);