import _ from 'lodash';
import {
  changeCfdTimeRangeEnd,
  changeCfdTimeRangeStart,
  selectCfdAggregate,
  selectCfdInterval,
  storeCfdReport,
  updateCfdItems,
  updateCfdPrios,
  updateCfdSeries
} from './actionTypes';

const initialState = {
  data: [],
  aggregate: 'count',
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
  },
  series: {
    todo: true,
    done: true,
    ct: false,
    th: false,
    wip: false
  },
  timeRange: {
    start: null,
    end: null
  }
};

const cfdReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case storeCfdReport:
      return {...state, data: payload};
    case selectCfdAggregate:
      return {...state, aggregate: payload};
    case selectCfdInterval:
      return {...state, interval: payload};
    case updateCfdItems:
      return {...state, items: _.set({...state.items}, payload.value, payload.checked)};
    case updateCfdPrios:
      return {...state, prios: _.set({...state.prios}, payload.value, payload.checked)};
    case updateCfdSeries:
      return {...state, series: _.set({...state.series}, payload.value, payload.checked)};
    case changeCfdTimeRangeStart:
      return {...state, timeRange: {...state.timeRange, start: payload}};
    case changeCfdTimeRangeEnd:
      return {...state, timeRange: {...state.timeRange, end: payload}};
    default:
      return state;
  }
};

export default cfdReducer;
