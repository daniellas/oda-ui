import {FormControl, FormControlLabel, FormGroup, FormLabel} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import {updateCfdSeries} from './actionTypes';
import Grid from '@material-ui/core/Grid';

const drawRow = (s, updateSeries) => {
  return (
    <Grid item xs={6} key={s.value}>
      <FormControlLabel value={s.value} label={s.value}
                        control={<Checkbox onChange={updateSeries} checked={s.checked}/>}/>
    </Grid>

  );
};

const CfdSeriesSelector = ({series, updateSeries}) => {
  if (!series || !series.length) return null;

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel>Select series: </FormLabel>
      <FormGroup row>
        {series.map(s => drawRow(s, updateSeries))}
      </FormGroup>
    </FormControl>
  );
};

const mapStateToProps = state => ({
  series: state.cfd.series
});

const mapDispatchToProps = (dispatch) => ({
  updateSeries: event => dispatch(createAction(updateCfdSeries, {
    value: event.target.value,
    checked: event.target.checked
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdSeriesSelector);