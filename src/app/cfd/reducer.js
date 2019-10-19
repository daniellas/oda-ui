import _ from 'lodash';
import {selectCfdInterval, storeCfdReport, updateCfdItems, updateCfdPrios} from './actionTypes';

const initialState = {
  data: [],
  interval: 'day',
  items: {
    Story: true,
    Bug: true
  },
  prios: {
    Lowest: true,
    Low: true,
    Medium: true,
    High: true,
    Highest: true,
    Critical: true
  }
};

const cfdReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case storeCfdReport:
      return {...state, data: payload};
    case selectCfdInterval:
      return {...state, interval: payload};
    case updateCfdItems:
      return {...state, items: _.set({...state.items}, payload.value, payload.checked)};
    case updateCfdPrios:
      return {...state, prios: _.set({...state.prios}, payload.value, payload.checked)};
    default:
      return state;
  }
};

export default cfdReducer;
