import {FormControl, FormControlLabel, FormGroup, FormLabel} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import {updateCfdSeries} from './actionTypes';
import Grid from '@material-ui/core/Grid';

const CfdSeriesSelector = ({data, series, updateSeries}) => {
  if (!data || !data.length) return null;

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel>Series: </FormLabel>
      <FormGroup row>
        <Grid item xs={6}>
          <FormControlLabel value="todo" label="To Do"
                            control={<Checkbox onChange={updateSeries} checked={series.todo}/>}/>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel value="done" label="Done"
                            control={<Checkbox onChange={updateSeries} checked={series.done}/>}/>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel value="ct" label="Cycle time"
                            control={<Checkbox onChange={updateSeries} checked={series.ct}/>}/>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel value="th" label="Throughput"
                            control={<Checkbox onChange={updateSeries} checked={series.th}/>}/>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel value="wip" label="Work in progress"
                            control={<Checkbox onChange={updateSeries} checked={series.wip}/>}/>
        </Grid>
      </FormGroup>
    </FormControl>
  );
};

const mapStateToProps = state => ({
  data: state.cfd.data,
  series: state.cfd.series
});

const mapDispatchToProps = (dispatch) => ({
  updateSeries: event => dispatch(createAction(updateCfdSeries, {
    value: event.target.value,
    checked: event.target.checked
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdSeriesSelector);