import {FormControl, FormControlLabel, FormGroup, FormLabel} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {updateCfdPrios} from './actionTypes';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const CfdPriosSelector = ({prios, updatePrios}) => (
  <FormControl component="fieldset">
    <FormLabel>Priorities:</FormLabel>
    <FormGroup row>
      <Grid item xs={6}>
        <FormControlLabel value="Critical" label="Critical"
                          control={<Checkbox onChange={updatePrios} checked={prios.Critical}/>}/>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel value="Highest" label="Highest"
                          control={<Checkbox onChange={updatePrios} checked={prios.Highest}/>}/>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel value="High" label="High"
                          control={<Checkbox onChange={updatePrios} checked={prios.High}/>}/>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel value="Medium" label="Medium"
                          control={<Checkbox onChange={updatePrios} checked={prios.Medium}/>}/>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel value="Low" label="Low"
                          control={<Checkbox onChange={updatePrios} checked={prios.Low}/>}/>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel value="Lowest" label="Lowest"
                          control={<Checkbox onChange={updatePrios} checked={prios.Lowest}/>}/>
      </Grid>
    </FormGroup>
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