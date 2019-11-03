import {httpRequestFailure} from '../http/actionTypes';
import {closeNotification} from './actionTypes';

const initialState = {};

const notificationReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case httpRequestFailure:
      return {open: true, payload: payload.message};
    case closeNotification:
      return {open: false};
    default:
      return state;
  }
};

export default notificationReducer;