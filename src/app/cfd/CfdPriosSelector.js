import {FormControl, FormControlLabel, FormGroup, FormLabel} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {updateCfdPrios} from './actionTypes';

const hasPrios = prios => Object.keys(prios).length > 0;

const renderPrios = (prios, updatePrios) => Object.keys(prios)
  .map(p => (
    <Grid item xs={6} key={p}>
      <FormControlLabel value={p} label={p} control={<Checkbox onChange={updatePrios} checked={prios[p]}/>}/>
    </Grid>
  ));

const CfdPriosSelector = ({prios, updatePrios}) => {
  if (!hasPrios(prios)) return null;

  return (
    <FormControl component="fieldset">
      <FormLabel>Priorities:</FormLabel>
      <FormGroup row>
        {renderPrios(prios, updatePrios)}
      </FormGroup>
    </FormControl>
  );
};

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