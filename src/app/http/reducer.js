import {httpRequestEnd, httpRequestFailure, httpRequestStart} from './actionTypes';

const initialState = {
  httpInProgress: false
};

const httpReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case httpRequestStart:
      return {httpInProgress: true};
    case httpRequestEnd:
      return {httpInProgress: false};
    case httpRequestFailure:
      return {httpInProgress: false};
    default:
      return state;
  }
};

export default httpReducer;