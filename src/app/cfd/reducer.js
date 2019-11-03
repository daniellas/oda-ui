import _ from 'lodash';
import {
  changeCfdTimeRangeEnd,
  changeCfdTimeRangeStart,
  selectCfdAggregate,
  selectCfdEntryState,
  selectCfdFinalState,
  selectCfdInterval,
  storeCfdReport,
  updateCfdItems,
  updateCfdPrios,
  updateCfdSeries
} from './actionTypes';
import {createPriosSeletion, extractSeries, selectSeries} from './cfd';
import {storeJiraProjectConfig} from '../jira/actionTypes';

const initialState = {
  data: [],
  aggregate: 'count',
  interval: 'day',
  items: {
    Story: true,
    Bug: true
  },
  series: [],
  timeRange: {
    start: null,
    end: null
  },
  entryState: '',
  finalState: '',
  prios: {}
};

const cfdReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case storeCfdReport:
      return {...state, data: payload.data, series: extractSeries(payload.data, state.entryState, state.finalState)};
    case selectCfdAggregate:
      return {...state, aggregate: payload};
    case selectCfdInterval:
      return {...state, interval: payload};
    case updateCfdItems:
      return {...state, items: _.set({...state.items}, payload.value, payload.checked)};
    case updateCfdSeries:
      return {...state, series: selectSeries(state.series, payload)};
    case changeCfdTimeRangeStart:
      return {...state, timeRange: {...state.timeRange, start: payload}};
    case changeCfdTimeRangeEnd:
      return {...state, timeRange: {...state.timeRange, end: payload}};
    case selectCfdEntryState:
      return {...state, entryState: payload};
    case selectCfdFinalState:
      return {...state, finalState: payload};
    case storeJiraProjectConfig:
      return {
        ...state,
        prios: createPriosSeletion(payload.prios),
        entryState: payload.entryState,
        finalState: payload.finalState
      };
    case updateCfdPrios:
      return {...state, prios: _.set({...state.prios}, payload.value, payload.checked)};
    default:
      return state;
  }
};

export default cfdReducer;
