import {FormControl, FormControlLabel, FormGroup, FormLabel} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {updateCfdItems} from './actionTypes';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const CfdItemsSelector = ({items, updateItems}) => (
  <FormControl component="fieldset">
    <FormLabel>Items:</FormLabel>
    <FormGroup row>
      <Grid item xs={6}>
        <FormControlLabel value="Story" label="Story"
                          control={<Checkbox onChange={updateItems} checked={items.Story}/>}/>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel value="Bug" label="Bug" control={<Checkbox onChange={updateItems} checked={items.Bug}/>}/>
      </Grid>
    </FormGroup>
  </FormControl>
);

const mapStateToProps = state => ({
  items: state.cfd.items
});

const mapDispatchToProps = (dispatch) => ({
  updateItems: event => dispatch(createAction(updateCfdItems, {
    value: event.target.value,
    checked: event.target.checked
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CfdItemsSelector);