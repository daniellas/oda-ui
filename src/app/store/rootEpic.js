import {BehaviorSubject} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {mergeMap} from 'rxjs/operators';

export const epicsSubscriber = new BehaviorSubject(combineEpics());

const rootEpic = (...args) =>
  epicsSubscriber.pipe(
    mergeMap(epic => epic(...args))
  );

export default rootEpic;
