import {endWith, map, startWith} from 'rxjs/operators';
import {pipe} from 'rxjs';
import {requestEnd, requestStart} from './actions';
import {createAction} from '../store/actionCreators';
import {httpRequestFailure} from './actionTypes';

const observableToAction = type => map(i => ({
  type: type,
  payload: i.response
}));

const progressAction = type => pipe(
  observableToAction(type),
  startWith(requestStart),
  endWith(requestEnd)
);

const dispatchSuccess = dispatch => next => dispatch(createAction(next.type, next.payload));
const dispatchError = dispatch => error => dispatch(createAction(httpRequestFailure, error));
const dispatchResponse = (dispatch, type) => next => dispatch(createAction(type, next.response));

export {observableToAction, progressAction, dispatchSuccess, dispatchError, dispatchResponse};