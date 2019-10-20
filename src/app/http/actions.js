import {createAction} from '../store/actionCreators';
import {httpRequestEnd, httpRequestFailure, httpRequestStart} from './actionTypes';

const requestStart = createAction(httpRequestStart);
const requestEnd = createAction(httpRequestEnd);
const requestFailure = createAction(httpRequestFailure);

export {requestStart, requestEnd, requestFailure};