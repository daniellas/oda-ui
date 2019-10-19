import {FormControl, FormControlLabel, FormLabel} from '@material-ui/core';
import React from 'react';
import {createAction} from '../store/actionCreators';
import {updateCfdItems} from './actionTypes';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';

const CfdItemsSelector = ({items, updateItems}) => (
  <FormControl component="fieldset">
    <FormLabel>Items:</FormLabel>
    <FormControlLabel value="Story" label="Story" control={<Checkbox onChange={updateItems} checked={items.Story}/>}/>
    <FormControlLabel value="Bug" label="Bug" control={<Checkbox onChange={updateItems} checked={items.Bug}/>}/>
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